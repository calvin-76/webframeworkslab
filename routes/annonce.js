var express = require('express');
var router = express.Router();
var Annonce = require('../models/annonce');
var Question = require('../models/question');
var multer = require("multer");
var upload = multer({ dest: "public/photos" });
var utils = require ("../utils");

router.get("/:id", function(req, res) {
    Annonce.findById(req.params.id, function(err, response) {
        if (!response) {
            res.send("error");
        } else {
            Question.find({
                '_id': { $in: response.questions}
            }, function(err, quests){
                res.render("annonce", {
                    questions : quests,
                    annonce : response,
                    user : req.user
                });
            });
        }
    });
});

router.get("/edit/:id", utils.checkAdmin, function(req, res) {
    Annonce.findById(req.params.id, function(err, response) {
        if (!response) {
            res.send("error");
        } else {
            res.render("edit", {
                annonce : response,
                user : req.user
            });
        }
    });
});



router.post("/edit/:id", utils.checkAdmin, upload.array("photos"), function (req, res){
    Annonce.findById(req.params.id, function(err, a) {
        if (!a)
            return next(new Error('Could not load Document'));
        else {
            if(req.body.image){
                if(Array.isArray(req.body.image))
                {
                    req.body.image.forEach(i => a.photos.splice(a.photos.indexOf(i), 1));
                }else{
                    a.photos.splice(a.photos.indexOf(req.body.image), 1)
                }
            }
            const files = req.files;
            for (index = 0; index < files.length; ++index) {
                a.photos.push((files[index].path).substring(7));
            }
            if(a.photos.length === 0) {
                a.photos.push("photos/default")
            }else if(a.photos.length > 1 && a.photos.includes("photos/default")){
                a.photos.splice("photos/default", 1)
            }
            a.titre = req.body.titre;
            a.type = req.body.type;
            a.statutPublication = req.body.statutPublication;
            a.statutBien = req.body.statutBien;
            a.description = req.body.description;
            a.prix = req.body.prix;
            a.disponibilite = req.body.disponibilite;
            a.save(function(err) {
                if (err)
                    console.log('error');
                else
                    console.log('success');
            });
            res.redirect("/annonce/" + a.id);
        }
    });
});

router.post("/delete/:id", utils.checkAdmin, function(req, res) {
    Annonce.findOneAndDelete({_id: req.params.id }, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            res.redirect('/');
            console.log("Deleted User : ", docs);
        }
    });
});

router.post("/question/:id", utils.checkUser, function(req, res) {
    Annonce.findById(req.params.id, function(err, a) {
        if (!a)
            return next(new Error('Could not load Document'));
        else {
            var question = { text: req.body.inputQuestion }
            Question.create(question, (err, question) => {
                if (err) {
                    console.log(err);
                }
                else {
                    a.questions.push(question);
                    a.save(function(err) {
                        if (err)
                            console.log('error');
                        else
                            console.log('success');
                    });
                    res.redirect('/annonce/' + a.id);
                }
            });
        }
    });
});

router.post("/repondre/:id", utils.checkAdmin, function(req, res) {
    Question.findById(req.params.id, function(err, q) {
        if (!q)
            return next(new Error('Could not load Document'));
        else {
            q.reponses.push(req.body.inputReponse);
            q.save(function(err) {
                if (err)
                    console.log('error');
                else
                    console.log('success');
            });
            res.redirect('back');
        }
    });
});


module.exports = router;

var express = require('express');
var router = express.Router();
var Annonce = require('../models/annonce');
var Question = require('../models/question');
var multer = require("multer");/*
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/photos')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.filename + '.' + extension)
  }
})
var upload = multer({ storage: storage});*/
var upload = multer({ dest: "public/photos" });

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

router.get("/edit/:id", function(req, res) {
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

router.post("/edit/:id", upload.array("photos"), function (req, res){
    Annonce.findById(req.params.id, function(err, a) {
        if (!a)
            return next(new Error('Could not load Document'));
        else {
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
            res.redirect('/annonce/' + a.id);
        }
    });
});

router.post("/delete/:id", function(req, res) {
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

router.post("/question/:id", function(req, res) {
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

router.post("/repondre/:id", function(req, res) {
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

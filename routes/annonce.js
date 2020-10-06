var express = require('express');
var router = express.Router();
var Annonce = require('../models/annonce');

router.get("/:id", function(req, res) {
    Annonce.findById(req.params.id, function(err, response) {
        if (!response) {
            res.send("error");
        } else {
            res.render("annonce", {
                annonce : response,
                user : req.user
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

router.post("/edit/:id",function (req, res){
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
            res.render("annonce", {
                annonce : a,
                user : req.user
            });
        }
    });
});

module.exports = router;

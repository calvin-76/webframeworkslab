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

module.exports = router;

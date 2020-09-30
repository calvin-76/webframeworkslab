var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var Annonce = require('../models/annonce');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/', function (req, res,next) {
  //res.render('index', { user : req.user });
  //TODO add filter publie?
  Annonce.find(function(err, annonce) {
    res.render('annonces', { title: 'Vitrine des annonces', annonces: annonce, user : req.user });
  });
});

router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res) {
  User.register(new User({ email : req.body.email, nom : req.body.nom ,  prenom : req.body.prenom , role : "Utilisateur"}), req.body.password,  function(err, user) {
    if (err) {
      return res.render('register', { user : user });
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/creerAnnonce', function (req, res) {
  res.render('creerAnnonce' , {});
});


router.post('/creerAnnonce',function (req, res){
  let img = req.files.image;
  img.mv('./uploads/' + img.name);
  var annonce = {
    titre: req.body.titre,
    type: req.body.type,
    statutPublication: req.body.statutAnnonce,
    statutBien: req.body.statutBien,
    description: req.body.description,
    prix: req.body.prix,
    disponibilite: req.body.disponibilite,
    photos: {
      data: req.files.image,
      contentType: "image/jpeg"
    }
  }
  Annonce.create(annonce, (err, item) => {
    if (err) {
      console.log(err);
    }
    else {
      // item.save();
      res.redirect('/');
    }
  });
});

router.get('/voirImage', function (req, res) {
  Annonce.findById('5f7343d23ceb816492aec952', function(err, result) {
    if (err) throw (err);
    var thumb = result.photos.data;
    res.render('image', {img: thumb});
  });
});


module.exports = router;

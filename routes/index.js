var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var Annonce = require('../models/annonce');
var router = express.Router();


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

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});

module.exports = router;

var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var Annonce = require('../models/annonce');
var app = require('../app');
var router = express.Router();
var multer = require("multer");
var upload = multer({ dest: "public/photos" });

router.get('/', function (req, res,next) {
  Annonce.find({ statutPublication: "Publié" }, function(err, annonce) {
    res.render('annonces', { title: 'Vitrine des annonces', annonces: annonce, user : req.user });
  });
});

router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res) {
  var droit = 'Utilisateur';
  if(req.body.code === '000') droit = 'Admin';
  User.register(new User({ email : req.body.email, nom : req.body.nom ,  prenom : req.body.prenom , role : droit}), req.body.password,  function(err, user) {
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

router.post('/creerAnnonce', upload.array("photos") ,function (req, res){
  const files = req.files;
  let result = [];
  for (index = 0, len = files.length; index < len; ++index) {
    result.push((files[index].path).substring(7));
  }
  if(files.length === 0) result.push("photos/default");

  var annonce = {
    titre: req.body.titre,
    type: req.body.type,
    statutPublication: req.body.statutPublication,
    statutBien: req.body.statutBien,
    description: req.body.description,
    prix: req.body.prix,
    disponibilite: req.body.disponibilite,
    photos: result
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

router.post("/upload", upload.single("photos"), function(req, res) {
  console.log(req.photos);
});

module.exports = router;
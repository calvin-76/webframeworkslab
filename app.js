// dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

var routes = require('./routes/index');
var users = require('./routes/users');
var annonces = require('./routes/annonce');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/annonce', annonces);
var User = require('./models/user');
var Annonce = require('./models/annonce');

// Configuration de passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connexion a la base de données
mongoose.connect('mongodb://localhost/testdb');

// Gestion des erreurs
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




User.register(
  new User({
    email: 'mariettecalvin@hotmail.fr',
    nom: 'Mariette',
    prenom: 'Calvin',
    role: 'Utilisateur'
  }), 'azerty', function(err, user) {}
);


var newAnnonce1 = new Annonce({
    titre: 'Appartement VERO',
    type: 'Vente',
    statutPublication: 'Publié',
    statutBien: 'Disponible',
    description: 'String',
    prix: 1,
    disponibilite: new Date("<2021-01-01>"),
    photos:"1.jpg"
});

Annonce.create(newAnnonce1, function(err,annonce){
    if(err) throw err;
    console.log(annonce);
});
module.exports = app;
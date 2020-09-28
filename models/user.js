var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    email: String,
    nom: String,
    prenom: String,
    password: String,
    role: String
});

UserSchema.plugin(passportLocalMongoose, {usernameField : 'email'});

module.exports = mongoose.model('User', UserSchema);
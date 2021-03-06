var should = require("should");
var mongoose = require('mongoose');
var User = require("../models/user.js");

describe('User', function() {

    before(async () => {
        await mongoose.connect('mongodb://localhost/testdb');
        done();
    });

    after(async () => {
        await mongoose.connection.close();
        done();
    });

    beforeEach(function(done) {
        var user = new User({
            email: 'mariettecalvin@hotmail.fr',
            nom: 'Mariette',
            prenom: 'Calvin',
            password: 'azerty',
            role: 'Utilisateur'
        });

        user.save(function(error) {
            if (error) console.log('error' + error.message);
            else console.log('no error');
            done();
        });
    });
/*
    it('find a user by username', function(done) {
        User.findOne({ email: 'mariettecalvin@hotmail.fr' }, function(err, user) {
            user.email.should.eql('mariettecalvin@hotmail.fr');
            console.log("email: ", user.email);
            done();
        });
    });
*/
    afterEach(function(done) {
        User.remove({}, function() {
            done();
        });
    });

});

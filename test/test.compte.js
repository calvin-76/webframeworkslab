var mongoose = require('mongoose');
var User = require("../models/user.js");

var request = require('supertest');
var app = require('../app');
var agent = request.agent(app);

describe('Compte', function() {

    before(async () => {
        await mongoose.connect('mongodb://localhost/testdb');
        User.register(
            new User({
                email: 'az@az.az',
                nom: 'Mariette',
                prenom: 'Calvin',
                role: 'Utilisateur'
            }), 'az', function(err, user) {}
        );
        done();
    });

    after(async () => {
        await mongoose.connection.close();
        done();
    });


    it('creer compte', function(done) {
        agent.post('/login')
            .send({ email: 'az@az.az', password: 'az' })
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('creer annonce', function(done) {
        agent.get('/creerAnnonce')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

});
var should = require("should");
var mongoose = require('mongoose');
var Annonce = require("../models/annonce.js");

describe('Annonce', function() {

    before(async () => {
        await mongoose.connect('mongodb://localhost/testdb');
        done();
    });

    after(async () => {
        await mongoose.connection.close();
        done();
    });

    beforeEach(function(done) {
        var annonce = new Annonce({
            titre: 'Appartement VERO',
            type: 'Vente',
            statutPublication: 'Publié',
            statutBien: 'Disponible',
            description: 'String',
            prix: 1000,
            disponibilite: new Date("<2021-01-01>"),
            photos:["photos/default"],
            questions:[]
        });

        annonce.save(function(error) {
            if (error) console.log('error' + error.message);
            else console.log('no error');
            done();
        });
    });

    it('find annonce by titre', function(done) {
        Annonce.findOne({ titre: 'Appartement VERO' }, function(err, annonce) {
            annonce.titre.should.eql('Appartement VERO');
            console.log("titre: ", annonce.titre);
            done();
        });
    });

    afterEach(function(done) {
        Annonce.remove({}, function() {
            done();
        });
    });

});

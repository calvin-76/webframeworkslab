var should = require("should");
var mongoose = require('mongoose');
var Question = require("../models/question.js");
var db;

describe('Question', function() {

    before(async () => {
        await mongoose.connect('mongodb://localhost/testdb');
        done();
    });

    after(async () => {
        await mongoose.connection.close();
        done();
    });

    beforeEach(function(done) {
        var question = new Question({
            text: "Dans quelle ville ?",
            reponses: ["Rouen","Rive droite"]
        });

        question.save(function(error) {
            if (error) console.log('error' + error.message);
            else console.log('no error');
            done();
        });
    });
/*
    it('find question by text', function(done) {
        Question.findOne({ text: "Dans quelle ville ?" }, function(err, question) {
            question.reponses[0].should.eql("Rouen");
            console.log("reponses[0]: ", question.reponses[0]);
            done();
        });
    });
*/
    afterEach(function(done) {
        Question.remove({}, function() {
            done();
        });
    });

});

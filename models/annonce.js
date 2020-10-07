var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnnonceSchema = new Schema({
    titre: String,
    type: {
        type: String,
        enum: ["Vente", "Location"]
    },
    statutPublication: {
        type: String,
        enum: ["Publié", "NonPublié"]
    },
    statutBien: {
        type: String,
        enum: ["Disponible", "Louée", "Vendu"]
    },
    description: String,
    prix: Number,
    disponibilite: Date,
    photos: [],
    questions: [{type: Schema.Types.ObjectId, ref: 'Question'}]
});

module.exports = mongoose.model('Annonce', AnnonceSchema);


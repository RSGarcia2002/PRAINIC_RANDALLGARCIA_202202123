const mongoose = require('mongoose');
const { Schema } = mongoose;

const CatedraticoSchema = new Schema({
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true }
});

module.exports = mongoose.model('Catedratico', CatedraticoSchema);

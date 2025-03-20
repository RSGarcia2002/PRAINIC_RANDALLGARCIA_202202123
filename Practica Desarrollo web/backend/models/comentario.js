const mongoose = require('mongoose');
const { Schema } = mongoose;

const ComentarioSchema = new Schema({
    publicacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Publicacion', required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    texto: { type: String, required: true }, // ✅ Asegurar que el campo se llama `texto`
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comentario', ComentarioSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const PublicacionSchema = new Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    curso: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso', default: null },
    catedratico: { type: mongoose.Schema.Types.ObjectId, ref: 'Catedratico', default: null },
    mensaje: { type: String, required: true },
    fecha_creacion: { type: Date, default: Date.now },
    comentarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comentario' }]
});

module.exports = mongoose.model('Publicacion', PublicacionSchema);

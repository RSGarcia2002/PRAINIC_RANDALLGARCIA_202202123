const mongoose = require('mongoose');
const { Schema } = mongoose;

const CursosAprobadosSchema = new Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    curso: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso', required: true }
}, { unique: ['usuario', 'curso'] });

module.exports = mongoose.model('CursosAprobados', CursosAprobadosSchema);

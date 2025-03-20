const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    codigo: { type: String, required: true, unique: true }, // Opcional
    creditos: { type: Number, required: true, default: 0 } // ✅ Ahora tiene créditos
});

module.exports = mongoose.model('Curso', CursoSchema);
const mongoose = require('mongoose');

const UsuariosSchema = new mongoose.Schema({
    registroAcademico: { type: String, required: true, unique: true }, // Clave única
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Usamos "email" para autenticación
    password: { type: String, required: true } // Usamos "password" en lugar de "contraseña"
});

module.exports = mongoose.model('Usuario', UsuariosSchema);

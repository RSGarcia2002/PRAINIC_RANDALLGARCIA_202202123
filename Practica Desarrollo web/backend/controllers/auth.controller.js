const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios'); 
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'mi_clave_secreta_super_segura';

// ✅ Registro de usuario (Ahora con mejores logs)
exports.register = async (req, res) => {
    const { registroAcademico, nombres, apellidos, email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            console.warn("⚠️ email ya registrado:", email);
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // 🔥 Hashear contraseña correctamente
        const hashedPassword = await bcrypt.hash(password, 10);
        usuario = new Usuario({ registroAcademico, nombres, apellidos, email, password: hashedPassword });
        await usuario.save();

        console.log("✅ Usuario registrado:", usuario.email);
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error("❌ Error en el registro:", error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body; 

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    try {

        const usuario = await Usuario.findOne({ email }); 

        if (!usuario) {
            console.warn("⚠️ Usuario no encontrado en la base de datos:", email);
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(password, usuario.password); // 🔥 Comparar `password`

        if (!validPassword) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: usuario._id, email: usuario.email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};




// ✅ Middleware para verificar el token
exports.verifyToken = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) {
        console.warn("⚠️ Token no encontrado en la solicitud.");
        return res.status(401).json({ message: 'Acceso denegado. No se encontró token.' });
    }

    console.log("🔍 Token recibido:", token); 

    try {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        console.log("✅ Token limpio:", token);

        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        console.error("❌ Error al verificar el token:", err.message);
        res.status(400).json({ message: 'Token no válido' });
    }
};

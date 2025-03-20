const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuarios.controller');
const { verifyToken } = require('../controllers/auth.controller'); // ✅ Protección con Token

// ✅ Rutas de gestión de usuarios
router.get('/', usuarioCtrl.getUsuarios);
router.get('/:id', usuarioCtrl.getUsuario);
router.put('/:id', verifyToken, usuarioCtrl.editUsuario);
router.delete('/:id', verifyToken, usuarioCtrl.deleteUsuario);

// ✅ Rutas para cursos aprobados del usuario
router.post('/cursos-aprobados', verifyToken, usuarioCtrl.agregarCursoAprobado);
router.delete('/cursos-aprobados/:id', verifyToken, usuarioCtrl.eliminarCursoAprobado);

module.exports = router;

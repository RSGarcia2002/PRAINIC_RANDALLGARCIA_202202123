const express = require('express');
const router = express.Router();
const comentarioCtrl = require('../controllers/comentario.controller');
const { verifyToken } = require('../controllers/auth.controller'); // ✅ Importar autenticación

// ✅ Obtener todos los comentarios (Para pruebas, en producción filtrar por publicación)
router.get('/', comentarioCtrl.getComentarios);

// ✅ Obtener un comentario específico por su ID
router.get('/:id', comentarioCtrl.getComentario);

// ✅ Crear un comentario (Solo usuarios autenticados)
router.post('/', verifyToken, comentarioCtrl.createComentario);

// ✅ Editar un comentario (Solo el autor puede hacerlo)
router.put('/:id', verifyToken, comentarioCtrl.editComentario);

// ✅ Eliminar un comentario (Solo el autor puede hacerlo)
router.delete('/:id', verifyToken, comentarioCtrl.deleteComentario);

module.exports = router;

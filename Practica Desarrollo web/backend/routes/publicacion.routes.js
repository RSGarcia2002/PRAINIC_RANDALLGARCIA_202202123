const express = require('express');
const router = express.Router();
const publicacionCtrl = require('../controllers/publicacion.controller');
const { verifyToken } = require('../controllers/auth.controller'); 


router.post('/', verifyToken, publicacionCtrl.crearPublicacion);
router.post('/', publicacionCtrl.crearPublicacion);
router.get('/', publicacionCtrl.obtenerPublicaciones);
router.get('/:id', publicacionCtrl.obtenerPublicacionPorId);
router.delete('/:id', publicacionCtrl.eliminarPublicacion);

module.exports = router;

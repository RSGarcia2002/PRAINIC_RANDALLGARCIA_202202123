const express = require('express');
const router = express.Router();
const cursosAprobadosCtrl = require('../controllers/cursosAprobados.controller');

router.get('/cursos_aprobados', cursosAprobadosCtrl.getCursosAprobados);
router.get('/cursos_aprobados/:usuarioId', cursosAprobadosCtrl.getCursosAprobadosPorUsuario);
router.post('/cursos_aprobados', cursosAprobadosCtrl.createCursoAprobado);
router.delete('/cursos_aprobados', cursosAprobadosCtrl.deleteCursoAprobado);

module.exports = router;

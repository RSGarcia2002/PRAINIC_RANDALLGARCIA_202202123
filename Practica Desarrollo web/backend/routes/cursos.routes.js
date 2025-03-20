const express = require('express');
const router = express.Router();
const cursoCtrl = require('../controllers/cursos.controller');

router.get('/cursos', cursoCtrl.getCursos);
router.get('/cursos/:id', cursoCtrl.getCurso);
router.post('/cursos', cursoCtrl.createCurso);
router.put('/cursos/:id', cursoCtrl.editCurso);
router.delete('/cursos/:id', cursoCtrl.deleteCurso);

module.exports = router;

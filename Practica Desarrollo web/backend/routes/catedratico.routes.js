const express = require('express');
const router = express.Router();
const catedraticoCtrl = require('../controllers/catedratico.controller');

router.get('/catedraticos', catedraticoCtrl.getCatedraticos);
router.get('/catedraticos/:id', catedraticoCtrl.getCatedratico);
router.post('/catedraticos', catedraticoCtrl.createCatedratico);
router.delete('/catedraticos/:id', catedraticoCtrl.deleteCatedratico);

module.exports = router;

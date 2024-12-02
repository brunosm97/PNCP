const express = require('express');
const router = express.Router();
const licitacaoController = require('../controllers/licitacaoController');

router.get('/', licitacaoController.getLicitacao);

module.exports = router;
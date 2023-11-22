const express = require('express');
const { autenticacion } = require('../controllers/controladorAuth');
const router = express.Router();

router.post('/', autenticacion);

module.exports = router;
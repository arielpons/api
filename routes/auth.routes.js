const express = require('express')
const router = express.Router();

const { login, register } = require('../controllers/auth.controller');
const { validarLogin, validarRegistro} = require('../middlewares/validarAuth');

router.post('/login', validarLogin,  login);
router.post('/', validarRegistro, register);

module.exports = router;
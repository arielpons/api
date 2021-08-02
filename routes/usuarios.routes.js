const express = require('express')
const router = express.Router();

const {
    getUsuario,
    putUsuario,
    deleteUsuario,
} = require('../controllers/usuarios.controller');

const { validarTokenUsuario, validarRoles } = require('../middlewares/validarAuth');

const {
    validarIdParamUsuario,
    validarPutUsuario,
} = require('../middlewares/validarUsuario')

router.get('/:_id', validarTokenUsuario, validarIdParamUsuario, getUsuario);
router.put(
    '/:_id',
    [validarRoles('ADMIN'), validarTokenUsuario, validarIdParamUsuario, validarPutUsuario],
     putUsuario
    );
router.delete('/:_id',
 [validarTokenUsuario, validarIdParamUsuario],
  deleteUsuario
  );

module.exports = router;
const express = require('express')
const router = express.Router();

const { 
    getAllRopa,
    postRopa,
    putRopa,
    deleteRopa,
} = require('../controllers/ropa.controller');

const { validarToken, validarTokenRopa } = require('../middlewares/validarAuth');

const {
    validarIdParamRopa,
    validarPostRopa,
    validarPutRopa,
} = require('../middlewares/validarRopa')

router.get("/", validarToken, getAllRopa);
router.post('/', 
[validarTokenRopa, validarPostRopa],
 postRopa
 );
router.put('/:_id', [validarTokenRopa, validarIdParamRopa, validarPutRopa],
 putRopa
 );
router.delete('/:_id',[validarTokenRopa, validarIdParamRopa]
, deleteRopa
);


module.exports = router;
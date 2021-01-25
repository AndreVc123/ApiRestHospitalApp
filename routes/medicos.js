const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, crearMedico } = require('../controllers/medicos');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/', getMedicos);
router.post('/', 
    [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('nombre', 'El hospital id debe de ser valido').isMongoId(),
        validarCampos
    ]
, crearMedico)

module.exports = router;
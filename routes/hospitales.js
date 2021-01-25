const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitales, crearHospital } = require('../controllers/hospitales');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/', getHospitales);
router.post('/', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ] 
, crearHospital)


module.exports = router;
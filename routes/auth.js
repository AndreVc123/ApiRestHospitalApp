const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', 
    [
        check('password', "La contrasena es obligatorio").not().isEmpty(),
        check('email', "El email es obligatorio").isEmail(),
        validarCampos
    ]
,login)


router.post('/google', 
    [
        check('token', "El token es obligatorio").not().isEmpty(),
        validarCampos
    ]
,googleSingIn)

module.exports = router;
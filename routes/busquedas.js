const Router = require('express');
const { busquedaTodo } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/:busqueda', validarJWT, busquedaTodo)

module.exports = router;
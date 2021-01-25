const Router = require('express');
const { fileUpload, getImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.put('/:tipo/:id', validarJWT , fileUpload);
router.get('/:tipo/:imagen', getImagen);

module.exports = router;
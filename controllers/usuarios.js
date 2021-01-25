const Usuario = require('../models/usuario');
const bcrypt =  require('bcryptjs');


const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ usuario, total] = await Promise.all([

        Usuario.find({}, 'nombre email google img').skip(desde).limit(5),

        Usuario.countDocuments()

    ])

    res.json({
        ok: true,
        usuario,
        total
    })
}


const crearUsuario = async (req, res) => {

    const {email, password, nombre} = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        const salt = bcrypt.genSaltSync();

        req.body.password = bcrypt.hashSync( req.body.password, salt);

        const usuario = new Usuario( req.body );

        await usuario.save();

        const token = await generarJWT(usuario.id);
    
        res.json({
            ok: true,
            usuario,
            token
        })

        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
        
    }

    
}

const actualizarUsuario = async (req, res) => {

    // TODO: Validar token y comprobar si el usuario es correcto

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){
            res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese uid'
            })
        }

        // Actualizaciones

        const {password, google, email, ...campos} = req.body;

        if(usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({ email })

            if( existeEmail ){
                res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una cuenta con ese correo'
                })
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findOneAndUpdate(uid, campos, {new: true});


        res.status(200).json({
            ok: true,
            usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const borrarUsuario = async (req, res) => {

    const uid = req.params.id;

    try {
        
        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){
            res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese uid'
            })
        }

        await Usuario.findByIdAndDelete( uid );

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

    res.status(200).json({
        ok: true,
        uid: req.params.id
    })

}



module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}
const { response } = require('express');
const bcrypt =  require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar Email

        const usuarioBD = await Usuario.findOne({email});

        if( !usuarioBD ){
            res.status(404).json({
                ok: false,
                msg: 'acceso denegado cheque las credenciales'
            })
        }

        // Verificar Contrasena

        const validPassword = bcrypt.compareSync(password, usuarioBD.password );

        if( !validPassword ){
            res.status(400).json({
                ok: false,
                msg: 'acceso denegado cheque las credenciales'
            })
        }

        // Generar Token

        const token = await generarJWT(usuarioBD.id);

        res.status(200).json({
            ok: true,
            token
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const googleSingIn = async(req, res) => {

    

    try {
        const tokenGoogle = req.body.token;

        const {name, email, picture } = await googleVerify(tokenGoogle);

        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if(!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        await usuario.save();

        
        const token = await generarJWT(usuarioDB.id);

        res.status(200).json({
            ok: true,
            token
        })
        
        
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    login,
    googleSingIn
}
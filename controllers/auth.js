const { response } = require('express');
const bcrypt =  require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


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

module.exports = {
    login
}
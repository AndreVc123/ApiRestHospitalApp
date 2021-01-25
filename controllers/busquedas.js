const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const busquedaTodo = async(req, res) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    const [usuario, medico, hospital ] = await Promise.all([
        await Usuario.find({nombre: regex}),
        await Medico.find({nombre: regex}),
        await Hospital.find({nombre: regex})
    ])

    res.json({
        ok:true,
        usuario,
        medico,
        hospital
    })

}

module.exports = {
    busquedaTodo
}
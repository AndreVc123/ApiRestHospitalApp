
const Hospital = require('../models/hospital');



const getHospitales = async(req, res) => {


    const hospitales = await Hospital.find().populate('usuario', 'nombre')

    res.json({
        ok:true,
        hospitales
    })
}

const crearHospital = async(req, res) => {

    const uid = req.uid;

    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const respuesta = await hospital.save();

        res.json({
            ok:true,
            respuesta
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }


}

module.exports = {
    getHospitales,
    crearHospital
}
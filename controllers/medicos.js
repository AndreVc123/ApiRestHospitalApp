const { populate } = require('../models/medico');
const Medico = require('../models/medico');


const getMedicos = async (req, res) => {

    
    const medicos = await Medico.find().populate('usuario', 'nombre').populate('hospital', 'nombre');

    res.json({
        ok:true,
        medicos
    })
}


const crearMedico = async(req, res) => {
    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const respuesta = await medico.save();

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
    getMedicos,
    crearMedico
}
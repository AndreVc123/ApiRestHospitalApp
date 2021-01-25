const fs = require('fs');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const Usuario = require( '../models/usuario');

let pathViejo;

const borrarImagen = (path) => {

    if(fs.existsSync(path)) {
        fs.unlinkSync(path)
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    switch(tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);

            if(!medico) {
                return false;
            }

            pathViejo = `./uploads/medicos/${medico.img}`;
            
            await borrarImagen(pathViejo);

            medico.img = nombreArchivo;

            await medico.save();

            return true;


        
        break;

        case 'hospitales':

            const hospital = await Hospital.findById(id);

            if(!hospital) {
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;
            
            await borrarImagen(pathViejo);

            hospital.img = nombreArchivo;

            await hospital.save();

            return true;

        break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);

            if(!usuario) {
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;
            
            await borrarImagen(pathViejo);

            usuario.img = nombreArchivo;

            await usuario.save();

            return true;
        break;
    }
}

module.exports = actualizarImagen;
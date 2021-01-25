
const { v4: uuidv4 } = require('uuid');
const actualizarImagen = require('../helpers/actualizar-imagen');
const path = require('path');
const fs = require('fs');

const fileUpload = (req, res) => {

    const {tipo, id} = req.params;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un tipo valido'
        })
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se selecciono nigun archivo'
        });
    }

    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if(!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
                    ok: false,
                    msg: 'No es una extension valida'
                })
    }

    //Generar nombre del archivo

    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, (err) => {
        if (err) {
            return res.status(400).json({
                    ok: false,
                    msg: 'No es una extension valida'
            })
        }

        //Actualizar base de datos
        if(actualizarImagen(tipo, id, nombreArchivo)) {
            return res.status(200).json({
                ok: true,
                msg: 'Imagen guardada correctamente'
        })
        }else {
            return res.status(400).json({
                ok: false,
                msg: 'La imagen no se pudo guardar'
        })
        }

    })



    
}


const getImagen = (req, res) => {
    const {tipo, imagen} = req.params;
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${imagen}`);

    //imagen por defecto
    if(fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImage = path.join(__dirname, `../uploads/image.png`);
        res.sendFile(pathImage);
    }

}

module.exports = {
    fileUpload,
    getImagen
}
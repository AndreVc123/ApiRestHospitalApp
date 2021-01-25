const {Schema, model} = require('mongoose');

const MedicoShema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
});

MedicoShema.method('toJSON', function() {
    const { __v,password, ...object} = this.toObject();
    return object;
})

module.exports = model( 'Medico', MedicoShema );
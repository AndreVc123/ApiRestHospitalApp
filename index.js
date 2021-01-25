const express = require('express');
require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('./database/config');

const app = express();

// Cors
app.use(cors());

//Lectura y parseo de body
app.use( express.json() );
app.use(fileUpload());

// Base de datos

dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));


app.listen(process.env.PORT, ()=>{
    console.log("servidor corriendo en puerto " + 3000)
})
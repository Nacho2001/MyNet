// Importacion de librerias
const express = require('express');
const app = express();
const cors = require('cors');


// Obtiene los datos de acceso a la base
const sequelize = require('./config/db');

// Trae el archivo con las rutas 
const rutasUsuarios = require('./routes/rutasUsuario');
const rutasPublicaciones = require('./routes/rutasPublicacion');
const rutaAutenticacion = require('./routes/rutaAutenticacion');
// Autenticion a la base
sequelize.authenticate()
.then(() => {
    console.log("Conexion con la base exitosa")
})
.catch((error) => {
    console.log(`Error al conectar con la base: ${error}`)
})

// Llamado a los middlewares
app.use(express.json());
app.use(cors());
// Configuracion de rutas
app.use('/usuarios', rutasUsuarios);
app.use('/publicaciones',rutasPublicaciones);
app.use('/login', rutaAutenticacion)

// Incio por puerto 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})
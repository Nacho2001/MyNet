const express = require("express");
const router = express.Router();
const controladorPost = require("../controllers/controladorPublicaciones");

// Rutas de publicaciones

// Obtener publicaciones
router.get('/', controladorPost.obtenerPublicaciones);

// Añadir publicacion
router.post('/', controladorPost.crearPublicacion);

// obtener unica publicacion
router.get('/:id', controladorPost.obtenerPublicacionUnica);

// Borrar publicacion
router.delete('/:id', controladorPost.borrarPublicacion);

// actualizar publicacion
router.put('/:id',  controladorPost.actualizarPublicacion);

// Obtener publicaciones de un usuario
router.get('/usuarios/:usuario', controladorPost.obtenerPublicacionDeUsuario);

// Obtener publicaciones entre fechas
router.get('/:fecha1/:fecha2', controladorPost.obtenerPostsEntrefechas);

// buscar publicaciones de un usuario entre fechas
router.get('/usuarios/:usuario/:fecha1/:fecha2', controladorPost.obtenerPostsUsuariosEntrefechas);

module.exports = router
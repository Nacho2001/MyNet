const Publicaciones = require("../models/modelPublicaciones");
const { Op } = require('sequelize');
const TokenCheck = require("../middlewares/verificacionJwt");

// Obtener Publicaciones
exports.obtenerPublicaciones = async (req,res) => {
    const validado = TokenCheck.verificacion(req,res);
    if (validado == true) {
        try {
            const publicaciones = await Publicaciones.findAll()
            res.status(200).json({
                estado:"ok",
                mensaje:"Publicaciones obtenidas",
                publicaciones
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                estado:"error",
                mensaje:`Error al obtener publicaciones: ${error}`
            })
        }   
    }
}

// Añadir publicaciones
exports.crearPublicacion = async(req,res) => {
    const validado = TokenCheck.verificacion(req,res);
    if (validado == true) {
        try {
            const publicacion = await Publicaciones.create(req.body);
            res.status(201).json({
                estado:"ok",
                mensaje:"post realizado exitosamente"
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                estado:"error",
                mensaje:`Error al realizar el post: ${error}`
            })
        }
    }

}

exports.obtenerPublicacionUnica = async (req,res) => {
    const validado = TokenCheck.verificacion(req,res);
    if (validado == true) {
        try {
            const publicacion = await Publicaciones.findByPk(req.params.id);
            if (publicacion == null){
                res.status(404).json({
                    estado:"error",
                    mensaje:"No se ha encontrado el post"
                })
            } else {
                res.status(200).json({
                    estado:"ok",
                    mensaje:"post obtenido exitosamente",
                    publicacion
                })
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                estado:"error",
                mensaje:`Error al obtener post: ${error}`
            })
        }
    }
}

// Borrar publicacion
exports.borrarPublicacion = async (req,res) => {
    const validado = TokenCheck.verificacion(req,res);
    if (validado) {
        try{
            const publicacion = await Publicaciones.destroy({
                where:{
                    id: req.params.id
                }
            })
            res.status(200).json({
                estado:"ok",
                mensaje:"Publicación eliminada",
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                estado:"error",
                mensaje:`Error al eliminar publicación`
            })
        }   
    }
}

// Actualizar post
exports.actualizarPublicacion = async (req,res) => {
    const validado = TokenCheck.verificacion(req,res);
    if (validado == true) {
        const idPost = req.params.id;
        const postInfo = req.body;
        const postActualizado = { idPost, ...postInfo }
        try {
            await Publicaciones.update({...postActualizado},{
                where: {
                    id:idPost
                }
            })
            res.status(200).json({
                estado:"ok",
                mensaje:"Post actualizado!"
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                estado:"error",
                mensaje:`Error actualizando el post: ${error}`
            })
        }
    }

}

// Obtener publicacion de un usuario especifico
exports.obtenerPublicacionDeUsuario = async (req,res) => {
    const validado = TokenCheck.verificacion(req,res);
    if (validado) {
        const usuario = req.params.usuario;
        try {
            const publicaciones = await Publicaciones.findAll({
                where: {
                    usuario: usuario
                }
            })
            if (publicaciones == null) {
                res.status(404).json({
                    estado:"error",
                    mensaje:`No hay publicaciones del usuario ${usuario}`
                })
            } else {
                res.status(200).json({
                    estado:"ok",
                    mensaje:`Publicaciones de ${usuario} obtenidas`,
                    publicaciones
                })   
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                estado:"error",
                mensaje:`Ocurrió un error al obtener publicaciones: ${error}`
            })
        }   
    }
}

// Obtener publicaciones entre fechas
exports.obtenerPostsEntrefechas = async (req,res) => {
    const validado = TokenCheck.verificacion(req,res);
    if (validado == true) {
        const fecha1 = req.params.fecha1;
        const fecha2 = req.params.fecha2;
        try {
            const publicaciones = await Publicaciones.findAll({
                where: {
                    fecha:{
                        [Op.between]:[fecha1,fecha2]
                    }
                }
            })
            if (publicaciones == null) {
                res.status(404).json({
                    estado:"Error",
                    mensaje:"No hay publicaciones entre las fechas ingresadas"
                })
            } else {
                res.status(200).json({
                    estado:"Ok",
                    mensaje:"Publicaciones obtenidas",
                    publicaciones
                })
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({
                estado:"Error",
                mensaje:`Error: ${error}`
            })
        }
    }
}

// Obtener Publicaciones de usuario entre fechas
exports.obtenerPostsUsuariosEntrefechas = async () => {
    const validado = TokenCheck.verificacion(req,res);
    if (validado) {
        const usuario = req.params.usuario;
        const fecha1 = req.params.fecha1;
        const fecha2 = req.params.fecha2;
        try {
            const publicaciones = await Publicaciones.findAll({
                where:{
                    [Op.and]:[{usuario:usuario}, {fecha:{[Op.between]:[fecha1,fecha2]}}]
                }
            })
            if (publicaciones == null) {
                res.status(404).json({
                    estado:"Error",
                    mensaje:`Usuario ${usuario} no tiene publicaciones entre las fechas seleccionadas`
                })
            } else {
                if (fecha1 > fecha2) {
                    res.status(400).json({
                        estado:"Error",
                        mensaje:"Error: La primera fecha debe ser anterior a la segunda"
                    })
                } else {
                    res.status(200).json({
                        estado:"Ok",
                        mensaje:"Publicaciones obtenidas",
                        publicaciones
                    })
                }
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({
                estado:"Error",
                mensaje:`Error: ${error}`
            })
        }
    }
}
const jwt = require('jsonwebtoken');
const Usuario = require('../models/modelUsuario');

exports.autenticacion = async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        // Busca el usuario ingresado en la base de datos
        const usuario = await Usuario.findAll({
            where: {
                username: username
            }
        });
        // Si no existe, retorna un error "Credenciales incorrectas"
        if (usuario == [] || usuario == "" | usuario == undefined){
            res.status(401).json({
                estado:"Error",
                mensaje:"Nombre de Usuario o Contraseña incorrectos"
            })
        } else {
            // Verifica la contraseña del usuario, si no es igual tambien retorna un error
            let claveGuardada = usuario[0].dataValues.password
            if (claveGuardada != password){
                res.status(401).json({
                    estado:"Error",
                    mensaje:"Nombre de Usuario o Contraseña incorrectos!"
                })
            } else {
                // Crea el token para el cliente si las credenciales son correctas
                const token = jwt.sign({userID: usuario.id}, 'MyNetForever', { expiresIn: '2h'})
                res.status(200).json({
                    estado:"Ok",
                    token: token
                })
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            estado:"Error",
            mensaje:"Error del servidor"
        })
    }
}
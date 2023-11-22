// Importa jsonwebtoken para proteger la ruta
const jwt = require('jsonwebtoken');

// Valida si existe el cliente posee un token y si es valido, si no lo es, enviará un mensaje de error
exports.verificacion = (req,res) => {
    let state = false;
    if (!req.headers.token) {
        res.status(401).json({
            estado:"Error",
            mensaje:"No se entregado un token"
        })
    } else {
        jwt.verify(req.headers.token, 'MyNetForever', (err, decoded) => {
            if (err){
                res.status(401).json({
                    estado:"Error",
                    mensaje:"El token no es válido"
                })
            } else {
                req.userId = decoded.userId;
                state = true
            }
        })
        return state
    }
}
const jwt = require('jsonwebtoken');
const User = require("../models/user");

const validarJWT = async (req, res, next) => {
    let token = req.headers.authorization;

    // Se verifica si es que existe el token en la petición.
    if (!token) {
        return res.status(401).json({
            msg: 'Error de autenticación - No hay token el la petición'
        })
    };

    try {
        // Se comprueba la validez del token, si es válido, se obtiene el id de usuario del mismo.
        const { uid } = await jwt.verify(token, process.env.SECRET)

        // Se busca el usuario en la base de datos para saber si pertenece al sistema
        const usuario = await User.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                error: 'Token no válido - el usuario no existe en la BD'
            });
        }

        Se verifica si el usuario está activo
        if (!usuario.isActive) {
            return res.status(401).json({
                msg: 'Token no válido - el usuari no está activo'
            })
        }

        // Se añade la información del usuario al request para que pueda ser utilizada en el resto de middlewares.
        req.user = usuario;

        // Se continúa con la ejecución del resto de la petición
        console.log("todo bien")
        next();
    }catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Error de autenticación - Token no válido'
        })
    }
};

module.exports = validarJWT;
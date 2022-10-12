const jwt = require('jsonwebtoken');
const { token } = require('morgan');

const generarJWT = (uid) => {
    return new Promise((resolve, reject)=>{
        // Se genera el token con el id del usuario y el secreto
        jwt.sign(uid, process.env.SECRET,{
            expiresIn: '5h'
        }, (err, token) =>{
            if(err){
                reject('No se pudo generar el token');
            }
            resolve({token})
        })
    })
}

module.exports = generarJWT;
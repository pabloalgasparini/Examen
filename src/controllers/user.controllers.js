const User = require ("../models/user");
const bcrypt = require('bcrypt');
const ctrlUser = {};

// Controlador para obtener todos los usuarios de la base de datos con método. save()
ctrlUser.getUser = async (req, res) => {
    const id = req.user._id
    // Se consultan todos los documentos de la base de datos.
    const user = await User.findById(id);

    // Se devuelve al cliiente un arreglo con los datod de los usuarios
    return res.json(user)
};



// ctrlUser.getUser = async (req, res) => {
//     // Se consultan todos los documentos de la base de datos.
//     const users = await User.find();

//     // Se devuelve al cliiente un arreglo con los datod de los usuarios
//     return res.json(users)
// };

ctrlUser.postUser = async (req, res) => {
    // Se obtienen los datos enviados por el método POST
    const {username, password, email} = req.body;

    // Encriptar la contraseña
    const newPassword = bcrypt.hashSync(password,10);

    const userExist = await User.findOne({email});
    if(userExist){
        return res.status(400).json({
            message:"El usuario ya existe"
        })
    }

    // Se instancia un nuevo documento de MongoDB para luego se guardado.
    const newUser = new User({
        username,
        password: newPassword,
        email
    });
    // Se guardan los datos en la BS.
    const user = await newUser.save()
    console.log(user);

    return res.json({
        msg: 'Usuario creado correctamente'
    })
};

// Actaulizar usuario
ctrlUser.putUser = async (req, res) => {
    const userId = req.user._id
    const {username, isActive, email, ...otraData} = req.body;
    const data = {username, email, isActive};
    try{
        const dataUpdated = await User.findOneAndUpdate(userId, data, {new: true} )
        return res.json({
            msg: 'Usuario actualizado correctamente',
            dataUpdated
        })
    }catch (error){
        return res.status(500).json({
            msg: 'Error al actualizar usuario'
        })
    }
};

ctrlUser.deleteUser = async (req, res) => {
    const userId = req.user._id
   
    try{
        // Borro físicamente
        // const dataUpdated = await User.findByIdAndDelete(userId)
        // Borro Logicamente
        const dataUpdated = await User.findByIdAndUpdate(userId, {isActive: false})
        return res.json({
            msg: 'Usuario borró correctamente',
            dataUpdated
        })
    }catch (error){
        return res.status(500).json({
            msg: 'Error al borrar usuario'
        })
    }
};

module.exports = ctrlUser;
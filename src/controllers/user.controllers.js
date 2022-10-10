const User = require ("../models/user");

const ctrlUser = {};

// Controlador para obtener todos los usuarios de la base de datos con método. save()
ctrlUser.getUser = async (req, res) => {
    const {id} = req.params
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
    const {username, password, email} = req.body;

    const newUser = new User({
        username,
        password,
        email
    });
    const user = await newUser.save()
    console.log(user);

    return res.json({
        msg: 'Usuario creado correctamente'
    })
};

// Actaulizar usuario
ctrlUser.putUser = async (req, res) => {
    const id = req.params.id
    const {username, isActive, email, ...otraData} = req.body;
    const data = {username, email, isActive};
    try{
        const dataUpdated = await User.findOneAndUpdate(id, data, {new: true} )
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
    const id = req.params.id
   
    try{
        // Borro físicamente
        // const dataUpdated = await User.findByIdAndDelete(id)
        // Borro Logicamente
        const dataUpdated = await User.findByIdAndUpdate(id, {isActive: false})
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
const mongoose = require('mongoose');

const dbConnect = () => {
    try{
        mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true
        });

        console.log('Conectado a la Base de Datos');
    }catch (error){
        console.log('Error al conectar a la Base de Datos');
        console.log(error.message);
    }
}

module.exports = dbConnect;
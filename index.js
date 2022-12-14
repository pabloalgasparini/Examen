const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');


dotenv.config();

const dbConnect =require("./src/BD/connection");
dbConnect();
// Inicializaciones
const app = express();

// Configuraciones
const port = process.env.PORT || 3000;

// MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Directorios de archivos estáticos
app.use(express.static(path.join(__dirname,'src/public')));

// Importando rutas
app.use(require("./src/routes/user.routes"));
app.use(require("./src/routes/auth.routes"));
app.use(require("./src/routes/task.routes"));


// Configurando puerto
app.listen(port, ()=>{
    console.log(`Servidor corriendo en http//localhost:${port}`)
})
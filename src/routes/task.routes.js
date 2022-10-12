const router = require('express').Router();
const validarJWT = require('../middlewares/validar-jwt');
// Importando controladores
const {
    getTask,
    postTask,
    putTask,
    deleteTask
} = require('../controllers/task.controllers');

// Defino rutas
router.get('/task',[validarJWT],getTask);

router.post('/task',[
    validarJWT
], postTask);

router.put('/task/:idTareas',[
    validarJWT
], putTask)

router.delete('/task/:idTareas',[
    validarJWT
], deleteTask)

module.exports = router;
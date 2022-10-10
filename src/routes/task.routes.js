const router = require('express').Router();

// Importando controladores
const {
    getTask,
    createTask
} = require('../controllers/task.controllers');

// Defino rutas
router.get('/task', getTask);

router.post('/task', createTask);

module.exports = router;
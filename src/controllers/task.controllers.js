const Task = require("../models/task");

const ctrlTask ={};

// Controlador para obtener todas las tareas de los usuarios en la Base de datos
ctrlTask.getTask = async (req, res) => {
    const tasks = await Task.find();

    return res.json(tasks)
};

// Controlador para crear tarea
ctrlTask.createTask = async (req, res) =>{
  const { title, description} = req.body;
  
  const task = new Task({
    title,
    description,
    // userId: req.user._id
  });

  try{
    const newTask = await task.save();

    return res.json({
        msg: 'Tarea creada correctamente',
        newTask
    })
  }catch (error){
    return res.status(500).json({
        msg: 'Error al crear la tarea'
    })
  }
};
module.exports = ctrlTask;
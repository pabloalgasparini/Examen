const Task = require("../models/task");

const ctrlTask ={};

// // Controlador para obtener todas las tareas de los usuarios en la Base de datos
// ctrlTask.getTask = async (req, res) => {
//     const tasks = await Task.find();

//     return res.json(tasks)
// };

// Controlador para crear tarea
ctrlTask.postTask = async (req, res) =>{
  const { title, description} = req.body;
  
  const task = new Task({
    title,
    description,
    userId: req.user._id
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

ctrlTask.getTask = async (req, res) => {
  try {
    const tasks = await Task.find({userId: req.user._id})
  .populate('userId', ['username', 'email'])
  return res.json({tasks})
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
};

ctrlTask.putTask = async (req, res) => {
  const idTareas = req.params.idTareas
  const { title, description, ...otraData} = req.body;
  const data = {title, description};
  try{
      const dataUpdated = await Task.findOneAndUpdate(idTareas, data, {new: true} )
      return res.json({
          msg: 'Tarea actualizado correctamente',
          dataUpdated
      })
  }catch (error){
      return res.status(500).json({
          msg: 'Error al actualizar tarea'
      })
  }
};

ctrlTask.deleteTask = async (req, res) => {
  const tareaId = req.params.idTareas
 
  try{
      // Borro físicamente
      // const dataUpdated = await User.findByIdAndDelete(tareaId)
      // Borro Logicamente
      const dataUpdated = await Task.findByIdAndUpdate(tareaId, {isActive: false})
      return res.json({
          msg: 'La tarea se borró correctamente',
          dataUpdated
      })
  }catch (error){
      return res.status(500).json({
          msg: 'Error al borrar tarea'
      })
  }
};

module.exports = ctrlTask;
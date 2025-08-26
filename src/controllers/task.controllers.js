import Task from '../models/task.model.js';
import User from '../models/user.model.js'; 

export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete, userId } = req.body;

    if (!title || !description || !userId) {
      return res.status(400).json({ message: 'El título, la descripción y el ID de usuario son requeridos.' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado. No se puede crear la tarea.' });
    }
    const newTask = await Task.create({
      title,
      description,
      isComplete: isComplete || false,
      userId,
    });

    return res.status(201).json(newTask);

  } catch (error) {

    if (error.name === 'SequelizeUniqueConstraintError'){
      return res.status(400).json({ message: 'El título de la tarea ya existe.' });
    }
    console.error(error);
    return res.status(500).json({ message: 'Error al crear la tarea.' });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
      ]
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tareas", error });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ['id', 'name', 'email']
        }
      ]
    });
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada.' });
    }
    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener la tarea.' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete, userId } = req.body;

    const task = await Task.findByPk(id);
    if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada.' });
    }

    await task.update({ title, description, isComplete, userId });
    return res.status(200).json({ message: 'Tarea actualizada con éxito.' });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'El título de la tarea ya existe.' });
    }
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar la tarea.' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await Task.destroy({ where: { id } });
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    return res.status(200).json({ message: 'Tarea eliminada con éxito' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar la tarea.' });
  }
};

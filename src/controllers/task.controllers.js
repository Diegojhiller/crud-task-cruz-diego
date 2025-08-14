import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener las tareas', error });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener la tarea', error });
  }
};

export const createTask = async (req, res) => {
  try {
    // Lógica de validación de datos de la tarea irá aquí
    const newTask = await Task.create(req.body);
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear la tarea', error });
  }
};


export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    // Lógica de validación y actualización irá aquí
    const [updatedRows] = await Task.update(req.body, { where: { id } });
    if (updatedRows === 0) {
        return res.status(404).json({ message: 'Tarea no encontrada o no se pudo actualizar' });
    }
    return res.status(200).json({ message: 'Tarea actualizada con éxito' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar la tarea', error });
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
    return res.status(500).json({ message: 'Error al eliminar la tarea', error });
  }
};
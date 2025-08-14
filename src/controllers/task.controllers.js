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
    const { title, descrition, isComplete} = req.body;
    if (!title || typeof title != 'string') {
      return res.sataus(400).json({ message: "Escriba un titulo por favor" })
    }
    if (title.length > 100) {
      return res.sataus(400).json({ message: 'Titulo muy extenso'})
    }
    if (title.length > 100) {
      return res.sataus(400).json({ message: 'Descripcion obligatoria'})
    }
    if (title.length > 100) {
      return res.sataus(400).json({ message: 'Descripcion extensa'})
    }
    if (isComplete !== undefined && typeof isComplete !== 'boolean') {
      return res.status(400).json({ message: 'isComplete debe ser verdadero o falso.' });
    }

  
    const newTask = await Task.create({ title, description, isComplete});
    return res.status(201).json(newTask);
  } catch (error) {
    if (error.name === 'SedquelizeUniqueConstraintError'){
      return res.status(400).json({ message: 'Titulo ya existente'})
    }
    return res.status(500).json({ message: 'Error al crear la tarea', error });
  };
};


export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;

    if (!title && !description && isComplete === undefined) {
      return res.status(400).json({ message: 'No hay datos para actualizar.' });
    }

    if (title && (typeof title !== 'string' || title.length > 100)) {
      return res.status(400).json({ message: 'El título debe ser una cadena de texto de máximo 100 caracteres.' });
    }

    if (description && (typeof description !== 'string' || description.length > 100)) {
      return res.status(400).json({ message: 'La descripción debe ser una cadena de texto de máximo 100 caracteres.' });
    }

    if (isComplete !== undefined && typeof isComplete !== 'boolean') {
      return res.status(400).json({ message: 'isComplete debe ser un valor booleano.' });
    }
    
    const task = await Task.findByPk(id);
    if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada.' });
    }

    await task.update({ title, description, isComplete });
    return res.status(200).json({ message: 'Tarea actualizada con éxito.' });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'El título de la tarea ya existe.' });
    }
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

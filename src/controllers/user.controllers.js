import User from '../models/user.model.js';
import Task from '../models/task.model.js'; 


export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Task,
        }
      ]
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ message: 'Error al obtener los usuarios.' });
  }
};


export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [
        {
          model: Task,
        }
      ]
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener el usuario.' });
  }
};


export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'El nombre es obligatorio y debe ser una cadena de texto.' });
    }
    
    if (name.length > 100) {
      return res.status(400).json({ message: 'El nombre no puede tener más de 100 caracteres.' });
    }
    
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: 'El email es obligatorio y debe ser una cadena de texto.' });
    }
    
    if (email.length > 100) {
      return res.status(400).json({ message: 'El email no puede tener más de 100 caracteres.' });
    }
    
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ message: 'La contraseña es obligatoria y debe ser una cadena de texto.' });
    }
    
    if (password.length > 100) {
      return res.status(400).json({ message: 'La contraseña no puede tener más de 100 caracteres.' });
    }
    
    const newUser = await User.create({ name, email, password });
    return res.status(201).json(newUser);
  } catch (error) {
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'El email del usuario ya existe.' });
    }
    return res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};



export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
      return res.status(400).json({ message: 'No hay datos para actualizar.' });
    }

    if (name && (typeof name !== 'string' || name.length > 100)) {
      return res.status(400).json({ message: 'El nombre debe ser una cadena de texto de máximo 100 caracteres.' });
    }

    if (email && (typeof email !== 'string' || email.length > 100)) {
      return res.status(400).json({ message: 'El email debe ser una cadena de texto de máximo 100 caracteres.' });
    }

    if (password && (typeof password !== 'string' || password.length > 100)) {
      return res.status(400).json({ message: 'La contraseña debe ser una cadena de texto de máximo 100 caracteres.' });
    }
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
  
    await user.update({ name, email, password });
    return res.status(200).json({ message: 'Usuario actualizado con éxito.' });
  } catch (error) {
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'El email del usuario ya existe.' });
    }
    return res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await User.destroy({ where: { id } });
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};
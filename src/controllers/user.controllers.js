import User from '../models/user.model.js';


export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};


export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};


export const createUser = async (req, res) => {
  try {
    // Lógica de validación de datos del usuario irá aquí
    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Lógica de validación y actualización irá aquí
    const [updatedRows] = await User.update(req.body, { where: { id } });
    if (updatedRows === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado o no se pudo actualizar' });
    }
    return res.status(200).json({ message: 'Usuario actualizado con éxito' });
  } catch (error) {
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
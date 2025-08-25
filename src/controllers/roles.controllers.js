import Role from '../models/rol.model.js';
import User from '../models/user.model.js';


export const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      return res.status(400).json({ message: 'El rol ya existe.' });
    }

    const newRole = await Role.create({ name });
    res.status(201).json({ message: 'Rol creado exitosamente.', role: newRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el rol.' });
  }
};


export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [{ model: User, as: 'User', attributes: ['name', 'email'] }]
    });
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los roles.' });
  }
};


export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id, {
      include: [{ model: User, as: 'User', attributes: ['name', 'email'] }]
    });
    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado.' });
    }
    res.status(200).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el rol.' });
  }
};


export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado.' });
    }

    await role.update({ name });
    res.status(200).json({ message: 'Rol actualizado.', role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el rol.' });
  }
};


export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado.' });
    }
    await role.destroy();
    res.status(200).json({ message: 'Rol eliminado.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el rol.' });
  }
};


export const addUserToRole = async (req, res) => {
  try {
    const { roleId, userId } = req.params;

    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado.' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    await role.addUser(user);
    res.status(200).json({ message: 'Usuario añadido al rol exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al añadir el usuario al rol.' });
  }
};


export const removeUserFromRole = async (req, res) => {
  try {
    const { roleId, userId } = req.params;

    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado.' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    await role.removeUser(user);
    res.status(200).json({ message: 'Usuario eliminado del rol exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el usuario del rol.' });
  }
};
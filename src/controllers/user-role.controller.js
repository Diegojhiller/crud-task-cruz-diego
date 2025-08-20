// src/controllers/user-role.controller.js
import User from '../models/user.model.js';
import Role from '../models/rol.model.js';

export const assignRoleToUser = async (req, res) => {
    try {
        const { userId, roleId } = req.body;

        const user = await User.findByPk(userId);
        const role = await Role.findByPk(roleId);

        if (!user || !role) {
            return res.status(404).json({ message: 'Usuario o rol no encontrado.' });
        }

        await user.addRole(role);

        return res.status(200).json({ message: 'Rol asignado al usuario con éxito.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al asignar el rol.' });
    }
};

export const getUsersWithRoles = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{
                model: Role,
                through: { attributes: [] },
                attributes: ['id', 'name']
            }]
        });
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los usuarios con roles.' });
    }
};
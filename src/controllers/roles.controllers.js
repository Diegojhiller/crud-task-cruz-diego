// src/controllers/roles.controller.js
import Role from '../models/rol.model.js';

export const createRole = async (req, res) => {
    try {
        const { name } = req.body;
        const newRole = await Role.create({ name });
        return res.status(201).json(newRole);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'El rol ya existe.' });
        }
        console.error(error);
        return res.status(500).json({ message: 'Error al crear el rol.' });
    }
};

export const getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        return res.status(200).json(roles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los roles.' });
    }
};
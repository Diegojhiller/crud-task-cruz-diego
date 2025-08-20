// src/routes/user.routes.js
import { Router } from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/user.controllers.js';
import { assignRoleToUser, getUsersWithRoles } from '../controllers/user-role.controller.js';

const router = Router();

// Rutas de CRUD para la entidad User
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Rutas para la relación de Muchos a Muchos
router.post('/roles', assignRoleToUser);
router.get('/roles', getUsersWithRoles);

export default router;
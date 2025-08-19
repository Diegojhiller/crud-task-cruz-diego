import { Router } from 'express';
import { createProfileAndAddress, getProfilesWithAddress, createRole, assignRoleToUser, getUsersWithRoles } from '../controllers/otros.controllers.js';

const router = Router();

// Rutas para la relacion Uno a Uno
router.post('/profiles', createProfileAndAddress);
router.get('/profiles', getProfilesWithAddress);

// Rutas para la relacion Muchos a Muchos
router.post('/roles', createRole);
router.post('/users/:userId/roles/:roleId', assignRoleToUser);
router.get('/users-with-roles', getUsersWithRoles);

export default router;

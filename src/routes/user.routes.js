import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/user.controllers.js';
import { assignRoleToUser, getUsersWithRoles } from '../controllers/user-role.controller.js';

const router = Router();

<<<<<<< HEAD
router.get('/', getUsers);
=======
router.get('/', getAllUsers);
>>>>>>> develop
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.post('/roles', assignRoleToUser);
router.get('/roles', getUsersWithRoles);

export default router;
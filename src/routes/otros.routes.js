import { Router } from 'express';
import { assignRoleToUser, getUsersWithRoles } from '../controllers/user-role.controller.js'; 

const router = Router();

router.post('/roles', assignRoleToUser);
router.get('/roles', getUsersWithRoles);

export default router;
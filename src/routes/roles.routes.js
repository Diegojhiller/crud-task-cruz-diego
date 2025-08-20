import { Router } from 'express';
import { createRole, getRoles } from '../controllers/roles.controllers.js';

const router = Router();

router.post('/', createRole);
router.get('/', getRoles);

export default router;
import { Router } from 'express';
import { body, param } from 'express-validator';
import { validateFields } from '../middlewares/validation.middleware.js';
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  addUserToRole,
  removeUserFromRole,
} from '../controllers/roles.controllers.js';

const router = Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('El nombre del rol es obligatorio.').isString(),
    validateFields,
  ],
  createRole
);

router.get('/', getAllRoles);

router.get(
  '/:id',
  [param('id').isInt().withMessage('El ID debe ser un número entero.'), validateFields],
  getRoleById
);

router.put(
  '/:id',
  [
    param('id').isInt().withMessage('El ID debe ser un número entero.'),
    body('name').optional().isString(),
    validateFields,
  ],
  updateRole
);

router.delete(
  '/:id',
  [param('id').isInt().withMessage('El ID debe ser un número entero.'), validateFields],
  deleteRole
);

router.post(
  '/:roleId/users/:userId',
  [
    param('roleId').isInt().withMessage('El ID del rol debe ser un número entero.'),
    param('userId').isInt().withMessage('El ID del usuario debe ser un número entero.'),
    validateFields,
  ],
  addUserToRole
);

router.delete(
  '/:roleId/users/:userId',
  [
    param('roleId').isInt().withMessage('El ID del rol debe ser un número entero.'),
    param('userId').isInt().withMessage('El ID del usuario debe ser un número entero.'),
    validateFields,
  ],
  removeUserFromRole
);

export default router;
import { Router } from 'express';
import { body, param } from 'express-validator';
import { validateFields } from '../middlewares/validation.middleware.js';
import {
  createProfileAndAddress,
  getAllProfilesWithDetails,
  getProfileWithDetailsById,
  updateProfileAndAddress,
  deleteProfileAndAddress,
} from '../controllers/profiles.controllers.js';

const router = Router();

router.post(
  '/:userId',
  [
    param('userId').isInt().withMessage('El ID de usuario debe ser un número entero.'),
    body('bio').optional().isString().withMessage('La biografía debe ser un texto.'),
  ],
  createProfileAndAddress
);

router.get('/', getAllProfilesWithDetails);

router.get(
  '/:id',
  [param('id').isInt().withMessage('El ID debe ser un número entero.'), validateFields],
  getProfileWithDetailsById
);

router.put(
  '/:id',
  [
    param('id').isInt().withMessage('El ID debe ser un número entero.'),
    body('bio').optional().isString().withMessage('La biografía debe ser un texto.'),
  ],
  updateProfileAndAddress
);

router.delete(
  '/:id',
  [param('id').isInt().withMessage('El ID debe ser un número entero.'), validateFields],
  deleteProfileAndAddress
);

export default router;
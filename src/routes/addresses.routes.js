import { Router } from 'express';
import { body, param } from 'express-validator';
import { validateFields } from '../middlewares/validation.middleware.js';
import {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} from '../controllers/addresses.controllers.js';

const router = Router();

router.post(
  '/:profileId',
  [
    param('profileId').isInt().withMessage('El ID del perfil debe ser un número entero.'),
    body('street').notEmpty().withMessage('La calle es obligatoria.').isString(),
    body('city').notEmpty().withMessage('La ciudad es obligatoria.').isString(),
    validateFields,
  ],
  createAddress
);

router.get('/', getAllAddresses);

router.get(
  '/:id',
  [param('id').isInt().withMessage('El ID debe ser un número entero.'), validateFields],
  getAddressById
);

router.put(
  '/:id',
  [
    param('id').isInt().withMessage('El ID debe ser un número entero.'),
    body('street').optional().isString(),
    body('city').optional().isString(),
    validateFields,
  ],
  updateAddress
);

router.delete(
  '/:id',
  [param('id').isInt().withMessage('El ID debe ser un número entero.'), validateFields],
  deleteAddress
);

export default router;
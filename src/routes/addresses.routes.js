// src/routes/addresses.routes.js
import { Router } from 'express';
import { createAddress, getAddresses } from '../controllers/addresses.controllers.js';

const router = Router();

router.post('/', createAddress);
router.get('/', getAddresses);

export default router;
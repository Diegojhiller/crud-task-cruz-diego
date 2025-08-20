import { Router } from 'express';
import { createProfile, getProfilesWithAddress } from '../controllers/profiles.controllers.js';

const router = Router();

router.post('/users/:id', createProfile);
router.get('/', getProfilesWithAddress);

export default router;
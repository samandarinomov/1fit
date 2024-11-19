import { Router } from 'express';
import { createGym, getAllGyms, getGymById, updateGym, deleteGym } from '../controllers/gym.controller';
import { validate } from '../middlewares/validation.middleware';
import { gymSchema, gymUpdateSchema } from '../validators/gym.validator';
import { isAdmin } from '../middlewares/is-admin.middleware';
import { isAuth } from '../middlewares/is-auth.middleware';

const router = Router();

router.post('/gym', isAuth, isAdmin, validate(gymSchema), createGym);
router.get('/gym', getAllGyms);
router.get('/gym/:id', getGymById);
router.put('/gym/:id', isAuth, isAdmin, validate(gymUpdateSchema), updateGym);
router.delete('/gym/:id', isAuth, isAdmin, deleteGym);

export default router;

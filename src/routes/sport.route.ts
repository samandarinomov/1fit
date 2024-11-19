import { Router } from 'express';
import { createSport, getAllSports, getSportById, updateSport, deleteSport } from '../controllers/sport.controller';
import { validate } from '../middlewares/validation.middleware';
import { sportSchema, sportUpdateSchema } from '../validators/sport.validator';
import { isAdmin } from '../middlewares/is-admin.middleware';
import { isAuth } from '../middlewares/is-auth.middleware';

const router = Router();

router.post('/sport', isAuth, isAdmin, validate(sportSchema), createSport);
router.get('/sport', getAllSports);
router.get('/sport/:id', getSportById);
router.put('/sport/:id', isAuth, isAdmin, validate(sportUpdateSchema), updateSport);
router.delete('/sport/:id', isAuth, isAdmin, deleteSport);

export default router;

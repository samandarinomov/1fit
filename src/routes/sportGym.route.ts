import { Router } from 'express';
import { linkSportGym, getGymsForSport } from '../controllers/sportGym.controller';
import { validate } from '../middlewares/validation.middleware';
import { linkSportGymSchema } from '../validators/sportGym.validator';
import { isAdmin } from '../middlewares/is-admin.middleware';
import { isAuth } from '../middlewares/is-auth.middleware';

const router = Router();

router.post('/sport-gym/link', isAuth, isAdmin, validate(linkSportGymSchema), linkSportGym);
router.get('/sport/:sportId/gyms', getGymsForSport);

export default router;

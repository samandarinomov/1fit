import { Router } from 'express';
import { getMe } from '../controllers/user.controller';
import { isAuth } from '../middlewares/is-auth.middleware';

const router = Router();

router.get('/user/me', isAuth, getMe);

export default router;

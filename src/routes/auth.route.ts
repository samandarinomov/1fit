import {Router} from 'express'
import { validate } from '../middlewares/validation.middleware';
import { loginSchema, registerSchema } from '../validators/auth.validator';
import { adminLogin, login, register } from '../controllers/auth.controller';
const router = Router();

router.post('/auth/register', validate(registerSchema), register);
router.post('/auth/login', validate(loginSchema), login);
router.post('/auth/admin/login', validate(loginSchema), adminLogin);

export default router;

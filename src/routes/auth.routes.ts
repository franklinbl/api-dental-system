import express, { RequestHandler } from 'express';
import { register, login } from '../controllers/auth.controller';
import { loginSchema, registerSchema } from '../dtos/auth.dto';
import { validate } from '../middleware/zod.middleware';

const router = express.Router();

router.post('/register', validate(registerSchema), register as RequestHandler);
router.post('/login', validate(loginSchema), login as RequestHandler);

export default router;
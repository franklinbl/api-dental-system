import express, { Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = express.Router();

// Ruta protegida de ejemplo
router.get('/me', authenticateJWT, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    next(error);
  }
});

export default router;
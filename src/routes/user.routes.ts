import express, { Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middleware/auth.middleware';
import { UserController } from '../controllers/user.controller';

const router = express.Router();
const userController = new UserController();

// Ruta protegida de ejemplo
router.get('/me', authenticateJWT, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    next(error);
  }
});

// Ruta para buscar dentistas por nombre o DNI
router.get('/searchDentists', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await userController.searchDentists(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
import express, { Request, Response, NextFunction } from 'express';
import { PatientController } from '../controllers/patient.controller';

const router = express.Router();
const patientController = new PatientController();

// Ruta protegida de ejemplo
router.get('/searchPatients', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await patientController.searchPatients(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
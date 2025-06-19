import express, { Request, Response, NextFunction } from 'express';
import { MedicalHistory } from '../models/MedicalHistory';

const router = express.Router();

// Obtener historial médico por patientId
router.get('/patient/:patientId', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { patientId } = req.params;
    const medicalHistory = await MedicalHistory.findOne({
      where: { patientId }
    });

    if (!medicalHistory) {
      res.status(404).json({ message: 'Historial médico no encontrado para este paciente' });
      return;
    }
    res.json(medicalHistory);
  } catch (error) {
    next(error);
  }
});

export default router;

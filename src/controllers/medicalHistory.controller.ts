import { Request, Response, NextFunction } from 'express';
import { MedicalHistory } from '../models/MedicalHistory';
import { Patient } from '../models/Patient';

export class MedicalHistoryController {
  // Obtener historial médico por patientId
  static async getByPatientId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { patientId } = req.params;

      const medicalHistory = await MedicalHistory.findOne({
        where: { patientId },
        include: [{
          model: Patient,
          as: 'patient',
          attributes: ['id', 'name', 'dni']
        }]
      });

      if (!medicalHistory) {
        res.status(404).json({ message: 'Historial médico no encontrado para este paciente' });
        return;
      }

      res.json(medicalHistory);
    } catch (error) {
      next(error);
    }
  }
}
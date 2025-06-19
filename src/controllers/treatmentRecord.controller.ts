import { Request, Response, NextFunction } from 'express';
import { TreatmentRecord } from '../models/TreatmentRecord';
import { Patient } from '../models/Patient';

export class TreatmentRecordController {
  // Obtener registros de tratamiento por patientId
  static async getByPatientId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { patientId } = req.params;

      const treatmentRecords = await TreatmentRecord.findAll({
        where: { patientId },
        include: [{
          model: Patient,
          as: 'patient'
        }],
        order: [['date', 'DESC']]
      });

      res.json(treatmentRecords);
    } catch (error) {
      next(error);
    }
  }
}
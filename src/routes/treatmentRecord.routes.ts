import express from 'express';
import { TreatmentRecordController } from '../controllers/treatmentRecord.controller';

const router = express.Router();

// Obtener registros de tratamiento por patientId
router.get('/patient/:patientId', TreatmentRecordController.getByPatientId);

export default router;
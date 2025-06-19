import express from 'express';
import { MedicalHistoryController } from '../controllers/medicalHistory.controller';

const router = express.Router();

// Obtener historial médico por patientId
router.get('/patient/:patientId', MedicalHistoryController.getByPatientId);

export default router;

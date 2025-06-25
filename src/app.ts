import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import medicalHistoryRoutes from './routes/medicalHistory.routes';
import treatmentRecordRoutes from './routes/treatmentRecord.routes';
import { createGenericRoute } from './routes/generic.route';

// Modelos
import { User } from './models/User';
import { Patient } from './models/Patient';
import { Appointment } from './models/Appointment';
import { MedicalHistory } from './models/MedicalHistory';
import { ToothRecord } from './models/ToothRecord';
import { TreatmentRecord } from './models/TreatmentRecord';

const app: Express = express();

// Generic routes
const routes = [
  createGenericRoute(User, '/users'),
  createGenericRoute(Patient, '/patients'),
  createGenericRoute(MedicalHistory, '/medical-histories'),
  createGenericRoute(ToothRecord, '/tooth-records'),
  createGenericRoute(TreatmentRecord, '/treatment-records'),
  createGenericRoute(Appointment, '/appointments'),
];

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/medical-histories', medicalHistoryRoutes);
app.use('/api/treatment-records', treatmentRecordRoutes);
app.use('/api/users', userRoutes);
// Register generic routes
routes.forEach(({ router, path }) => {
  app.use(`/api${path}`, router);
});

// Ruta principal
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Backend del sistema odontológico funcionando con TypeScript 🦷' });
});

export default app;
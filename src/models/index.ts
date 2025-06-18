import { User } from './User';
import { Patient } from './Patient';
import { Appointment } from './Appointment';
import { Sequelize } from 'sequelize-typescript';
import { Role } from './Role';
import { MedicalHistory } from './MedicalHistory';
import { ToothRecord } from './ToothRecord';
import { TreatmentRecord } from './TreatmentRecord';

const models = [
  User,
  Patient,
  Appointment,
  Role,
  MedicalHistory,
  ToothRecord,
  TreatmentRecord,
];

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dental-system',
  models: models,
  logging: false,
});

// Relaciones
User.hasMany(Appointment, { foreignKey: 'userId' });
Appointment.belongsTo(User, { foreignKey: 'userId' });

Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

Patient.hasMany(Appointment, { foreignKey: 'patientId' });
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });

Patient.hasMany(MedicalHistory, { foreignKey: 'patientId' });
MedicalHistory.belongsTo(Patient, { foreignKey: 'patientId' });

Patient.hasMany(ToothRecord, { foreignKey: 'patientId' });
ToothRecord.belongsTo(Patient, { foreignKey: 'patientId' });

Patient.hasMany(TreatmentRecord, { foreignKey: 'patientId' });
TreatmentRecord.belongsTo(Patient, { foreignKey: 'patientId' });

export {
  User,
  Patient,
  Appointment,
  Role,
  MedicalHistory,
  ToothRecord,
  TreatmentRecord,
};
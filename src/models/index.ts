import { User } from './User';
import { Patient } from './Patient';
import { Appointment } from './Appointment';
import { Treatment } from './Treatment';
import { PatientTreatment } from './PatientTreatment';
import { Invoice } from './Invoice';
import { Product } from './Product';
import { InventoryMovement } from './InventoryMovement';
import { Sequelize } from 'sequelize-typescript';

const models = [
  User,
  Patient,
  Appointment,
  Treatment,
  PatientTreatment,
  Invoice,
  Product,
  InventoryMovement,
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

Patient.hasMany(Appointment, { foreignKey: 'patientId' });
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });

Patient.hasMany(PatientTreatment, { foreignKey: 'patientId' });
PatientTreatment.belongsTo(Patient, { foreignKey: 'patientId' });

Treatment.hasMany(PatientTreatment, { foreignKey: 'treatmentId' });
PatientTreatment.belongsTo(Treatment, { foreignKey: 'treatmentId' });

Product.hasMany(InventoryMovement, { foreignKey: 'productId' });
InventoryMovement.belongsTo(Product, { foreignKey: 'productId' });

export {
  User,
  Patient,
  Appointment,
  Treatment,
  PatientTreatment,
  Invoice,
  Product,
  InventoryMovement,
};
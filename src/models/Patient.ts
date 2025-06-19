import { Model } from 'sequelize-typescript';
import { Table, Column, DataType, HasMany, HasOne } from 'sequelize-typescript';
import { MedicalHistory } from './MedicalHistory';
import { Appointment } from './Appointment';
import { ToothRecord } from './ToothRecord';
import { TreatmentRecord } from './TreatmentRecord';

@Table({
  tableName: 'patients',
  timestamps: true,
})
export class Patient extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare dni: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare birthDate: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare phone: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare address: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare email: string | null;

  // Datos adicionales
  @Column({
    type: DataType.ENUM('male', 'female', 'other'),
    allowNull: true,
  })
  declare gender: 'male' | 'female' | 'other' | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare occupation: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare landlinePhone: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare legalGuardianName: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare legalGuardianDni: string | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare age: number | null;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'created_at',
  })
  declare readonly createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'updated_at',
  })
  declare readonly updatedAt: Date;

  @HasOne(() => MedicalHistory)
  declare medicalHistories: MedicalHistory;

  @HasMany(() => Appointment)
  declare appointments: Appointment[];

  @HasMany(() => ToothRecord)
  declare toothRecords: ToothRecord[];

  @HasMany(() => TreatmentRecord)
  declare treatmentRecords: TreatmentRecord[];
}
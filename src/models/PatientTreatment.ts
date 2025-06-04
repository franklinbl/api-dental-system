import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { Patient } from './Patient';
import { Treatment } from './Treatment';

@Table({
  tableName: 'patient_treatments',
  timestamps: true,
})
export class PatientTreatment extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number;

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare patientId: number;

  @ForeignKey(() => Treatment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare treatmentId: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare startDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare endDate: Date | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare notes: string | null;

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
}
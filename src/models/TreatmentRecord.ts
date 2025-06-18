import { Model } from 'sequelize-typescript';
import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Patient } from './Patient';

@Table({
  tableName: 'treatment_records',
  timestamps: true,
})
export class TreatmentRecord extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number;

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare patientId: string;

  @BelongsTo(() => Patient)
  declare patient: Patient;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare date: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare treatmentDescription: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare amountPaid: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare remainingBalance: number;

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
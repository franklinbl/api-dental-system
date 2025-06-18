import { Model } from 'sequelize-typescript';
import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Patient } from './Patient';

@Table({
  tableName: 'tooth_records',
  timestamps: true,
})
export class ToothRecord extends Model {
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
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 32,
    },
  })
  declare toothNumber: number; // Número de diente (1-32)

  @Column({
    type: DataType.ENUM(
      'healthy',
      'filled',
      'caries',
      'implant',
      'missing',
      'prosthetic',
      'endodontics',
      'restoration'
    ),
    allowNull: false,
  })
  declare condition:
    | 'healthy'
    | 'filled'
    | 'caries'
    | 'implant'
    | 'missing'
    | 'prosthetic'
    | 'endodontics'
    | 'restoration';

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
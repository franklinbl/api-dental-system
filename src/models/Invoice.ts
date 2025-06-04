import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { Patient } from './Patient';

@Table({
  tableName: 'invoices',
  timestamps: true,
})
export class Invoice extends Model {
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

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare total: number;

  @Column({
    type: DataType.ENUM('pendiente', 'pagado', 'vencido'),
    defaultValue: 'pendiente',
    allowNull: false,
  })
  declare paymentStatus: 'pendiente' | 'pagado' | 'vencido';

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare generatedAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare paidAt: Date | null;

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
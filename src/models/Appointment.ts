import { Model, Table, Column, DataType, ForeignKey, BelongsTo, BeforeUpdate, BeforeCreate } from 'sequelize-typescript';
import { User } from './User';
import { Patient } from './Patient';

@Table({
  tableName: 'appointments',
  timestamps: true,
})
export class Appointment extends Model {
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare dateTime: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare reason: string | null;

  @Column({
    type: DataType.ENUM('pendiente', 'completada', 'cancelada'),
    defaultValue: 'pendiente',
    allowNull: false,
  })
  declare status: 'pendiente' | 'completada' | 'cancelada';

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

  // Hook para validar que el usuario sea dentista
  @BeforeCreate
  @BeforeUpdate
  static async validateUserIsDentist(instance: Appointment) {
    const user = await instance.$get('user');

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (user.roleId !== 2) {
      // Asume que el rol "dentist" tiene roleId = 2
      throw new Error('El usuario asociado debe ser un dentista');
    }
  }
}
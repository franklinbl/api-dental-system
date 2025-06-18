import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Role } from './Role';
import { Appointment } from './Appointment';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number;

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
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 3,
  })
  declare roleId: number;

  @BelongsTo(() => Role)
  declare role: Role;

  @HasMany(() => Appointment)
  declare appointments: Appointment[];

  @Column(DataType.DATE)
  declare readonly createdAt: Date;

  @Column(DataType.DATE)
  declare readonly updatedAt: Date;
}
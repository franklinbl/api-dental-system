import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { User } from './User';

@Table({
  tableName: 'roles',
  timestamps: false,
})
export class Role extends Model {
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
    unique: true,
    validate: {
      isIn: [['admin', 'dentist', 'receptionist']],
    },
  })
  declare name: 'admin' | 'dentist' | 'receptionist';

  @HasMany(() => User)
  declare users: User[];
}

export default Role;
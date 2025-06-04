import { Model, Table, Column, DataType } from 'sequelize-typescript';

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
}

export default Role;
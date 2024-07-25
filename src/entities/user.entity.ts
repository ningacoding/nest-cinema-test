import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import Booking from './booking.entity';
import Role from './role.entity';

@Table
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Unique
  @Column({
    allowNull: false,
  })
  email: string;

  @Column({
    allowNull: false,
  })
  password: string;

  @ForeignKey(() => Role)
  @Column({
    allowNull: false,
  })
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @HasMany(() => Booking)
  bookings: Booking[];
}

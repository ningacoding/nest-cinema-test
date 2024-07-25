import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import MovieFunction from './movie.function.entity';
import Seat from './seat.entity';
import User from './user.entity';

/**
 * Representa la agenda para una sala.
 * Está relacionado con una sala, un horario y un asiento
 */
@Table
export default class Booking extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({
    allowNull: false,
    type: DataType.DATEONLY,
  })
  scheduledDate: Date;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  booker: User;

  @ForeignKey(() => MovieFunction)
  @Column({
    allowNull: false,
  })
  movieFunctionId: number;

  @BelongsTo(() => MovieFunction)
  movieFunction: MovieFunction;

  @ForeignKey(() => Seat)
  @Column({
    allowNull: false,
  })
  seatId: number;

  @BelongsTo(() => Seat)
  seat: Seat;
}

import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Auditorium from './auditorium.entity';

/**
 * Representa un asiento numerado dentro de una sala.
 * Está relacionado con un booker y pertenece a una sala.
 */
@Table
export default class Seat extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({
    allowNull: false,
  })
  seatNumber: number;

  @ForeignKey(() => Auditorium)
  @Column({
    allowNull: false,
  })
  auditoriumId: number;

  @BelongsTo(() => Auditorium)
  auditorium: Auditorium;
}

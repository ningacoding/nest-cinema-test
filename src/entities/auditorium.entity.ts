import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

/**
 * Representa cada sala en el cine.
 * Tiene una cantidad de horarios disponibles y un número de asientos.
 */
@Table({
  tableName: 'Auditoriums',
})
export default class Auditorium extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({
    allowNull: false,
  })
  name: string;
}

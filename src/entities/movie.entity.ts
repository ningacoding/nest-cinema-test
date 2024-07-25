import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

/**
 * Representa la película disponible.
 */
@Table
export default class Movie extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
  })
  coverImageUrl: string;

  @Column({
    allowNull: false,
  })
  durationInMinutes: number;
}

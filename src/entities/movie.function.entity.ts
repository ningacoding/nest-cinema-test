import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Movie from './movie.entity';

/**
 * Representa la película disponible.
 */
@Table
export default class MovieFunction extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({
    allowNull: false,
  })
  shownAt24HoursFormat: number;

  @Column({
    allowNull: false,
    defaultValue: 0,
  })
  shownAtMinutes: number;

  @ForeignKey(() => Movie)
  @Column({
    allowNull: false,
  })
  movieId: number;

  @BelongsTo(() => Movie)
  movie: Movie;
}

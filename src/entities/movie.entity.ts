import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import MovieFunction from './movie.function.entity';

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

  @HasMany(() => MovieFunction)
  movieFunctions: MovieFunction[];
}

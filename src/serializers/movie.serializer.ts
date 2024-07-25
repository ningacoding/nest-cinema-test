import { Exclude, Expose } from 'class-transformer';
import MovieFunction from '../entities/movie.function.entity';
import { Clazz } from '../utils/clazz';
import { MovieFunctionSerializer } from './movie.function.serializer';
import { Serializer } from './serializer';

@Exclude()
export class MovieSerializer extends Serializer {
  private readonly movieFunctions: MovieFunction[];

  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  durationInMinutes: number;

  constructor(partial: any) {
    super(partial, MovieSerializer);
  }

  @Expose({ name: 'movieFunctions' })
  getMovieFunctions() {
    return this.movieFunctions.map((movieFunction) =>
      Clazz.serialize(movieFunction, MovieFunctionSerializer),
    );
  }
}

import { Exclude, Expose, Transform } from 'class-transformer';
import { MovieFunctionSerializer } from './movie.function.serializer';

@Exclude()
export class MovieSerializer {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  coverImageUrl: string;

  @Expose()
  durationInMinutes: number;

  @Transform(({ obj }) =>
    obj?.movieFunctions?.map(
      (movieFunction: Partial<MovieFunctionSerializer>) =>
        new MovieFunctionSerializer(movieFunction),
    ),
  )
  @Expose()
  movieFunctions: MovieFunctionSerializer[];

  constructor(partial: Partial<MovieSerializer>) {
    Object.assign(this, partial);
  }
}

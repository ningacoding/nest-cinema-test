import { Exclude, Expose, Type } from 'class-transformer';
import { MovieFunctionSerializer } from './movie.function.serializer';

@Exclude()
export class UserSerializer {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  @Type(() => MovieFunctionSerializer)
  movieFunction: MovieFunctionSerializer;

  constructor(partial: Partial<UserSerializer>) {
    Object.assign(this, partial);
  }
}

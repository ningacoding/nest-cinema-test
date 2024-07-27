import { Exclude, Expose, Type } from 'class-transformer';
import * as moment from 'moment';
import { MovieSerializer } from './movie.serializer';

@Exclude()
export class MovieFunctionSerializer {
  @Expose()
  id: number;

  @Expose()
  movieId: number;

  @Expose()
  shownAt24HoursFormat: number;

  @Expose()
  shownAtMinutes: number;

  @Expose()
  @Type(() => MovieSerializer)
  movie: MovieSerializer;

  constructor(partial: Partial<MovieFunctionSerializer>) {
    Object.assign(this, partial);
  }

  @Expose({ name: 'shownAt' })
  getShownAt() {
    return moment(
      `${this.shownAt24HoursFormat}:${this.shownAtMinutes}`,
      'HH:mm',
    ).format('h:mm a');
  }
}

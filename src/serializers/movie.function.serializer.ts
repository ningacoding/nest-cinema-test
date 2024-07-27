import { Exclude, Expose } from 'class-transformer';
import * as moment from 'moment';

@Exclude()
export class MovieFunctionSerializer {
  private readonly shownAt24HoursFormat: number;

  private readonly shownAtMinutes: number;

  @Expose()
  id: number;

  @Expose()
  movieId: number;

  constructor(partial: Partial<MovieFunctionSerializer>) {
    Object.assign(this, partial);
  }

  @Expose({ name: 'shownAt' })
  getShownAt() {
    return moment(
      `${this.shownAt24HoursFormat}:${this.shownAtMinutes}`,
      'HH:mm',
    ).format('HH:mm');
  }
}

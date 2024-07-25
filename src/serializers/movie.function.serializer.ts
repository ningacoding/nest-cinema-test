import { Exclude, Expose } from 'class-transformer';
import * as moment from 'moment';
import { Serializer } from './serializer';

@Exclude()
export class MovieFunctionSerializer extends Serializer {
  private readonly shownAt24HoursFormat: number;

  private readonly shownAtMinutes: number;

  @Expose()
  id: number;

  @Expose()
  movieId: number;

  constructor(partial: any) {
    super(partial, MovieFunctionSerializer);
  }

  @Expose({ name: 'shownAt' })
  getShownAt() {
    return moment()
      .hour(this.shownAt24HoursFormat)
      .minute(this.shownAtMinutes)
      .format('HH:mm');
  }
}

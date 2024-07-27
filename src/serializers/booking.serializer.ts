import { Exclude, Expose, Transform, Type } from 'class-transformer';
import * as moment from 'moment';
import { MovieFunctionSerializer } from './movie.function.serializer';
import { SeatSerializer } from './seat.serializer';
import { UserSerializer } from './user.serializer';

@Exclude()
export class BookingSerializer {
  @Transform(({ obj }) => moment(obj.scheduledDate).format('DD-MM-YYYY'))
  @Expose()
  scheduledDate: Date;

  @Expose()
  @Transform(({ obj }) => new MovieFunctionSerializer(obj.movieFunction))
  movieFunction: MovieFunctionSerializer;

  @Expose({ name: 'user' })
  @Type(() => UserSerializer)
  booker: UserSerializer;

  @Expose()
  @Type(() => SeatSerializer)
  seat: SeatSerializer;

  constructor(partial: Partial<BookingSerializer>) {
    Object.assign(this, partial);
  }
}

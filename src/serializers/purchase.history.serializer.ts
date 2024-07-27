import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { AuditoriumSerializer } from './auditorium.serializer';
import { MovieFunctionSerializer } from './movie.function.serializer';
import { SeatSerializer } from './seat.serializer';

@Exclude()
export class PurchaseHistorySerializer {
  @Expose()
  id: string;

  @Expose()
  purchaseId: string;

  @Expose()
  scheduledDate: string;

  @Expose()
  @Transform(({ obj }) => new MovieFunctionSerializer(obj.movieFunction))
  movieFunction: MovieFunctionSerializer;

  @Expose()
  @Type(() => AuditoriumSerializer)
  auditorium: AuditoriumSerializer;

  @Expose()
  @Type(() => SeatSerializer)
  seats: SeatSerializer[];

  constructor(partial: Partial<PurchaseHistorySerializer>) {
    Object.assign(this, partial);
  }
}

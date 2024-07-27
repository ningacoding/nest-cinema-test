import { Exclude, Expose, Type } from 'class-transformer';
import { AuditoriumSerializer } from './auditorium.serializer';

@Exclude()
export class SeatSerializer {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  auditoriumName: string;

  @Expose()
  available: boolean;

  @Expose()
  seatNumber: number;

  @Expose()
  @Type(() => AuditoriumSerializer)
  auditorium: AuditoriumSerializer;

  constructor(partial: Partial<SeatSerializer>) {
    Object.assign(this, partial);
  }
}

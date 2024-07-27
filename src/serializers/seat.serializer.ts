import { Exclude, Expose } from 'class-transformer';

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

  constructor(partial: Partial<SeatSerializer>) {
    Object.assign(this, partial);
  }
}

import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AuditoriumSerializer {
  @Expose()
  id: number;

  @Expose()
  name: string;

  constructor(partial: Partial<AuditoriumSerializer>) {
    Object.assign(this, partial);
  }
}

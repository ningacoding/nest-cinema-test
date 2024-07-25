import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateMovieFunctionDto {
  @ApiProperty()
  @IsNumber()
  movieId: number;

  @ApiProperty()
  @IsNumber()
  shownAt24HoursFormat: number;

  @ApiProperty()
  @IsNumber()
  shownAtMinutes: number;
}

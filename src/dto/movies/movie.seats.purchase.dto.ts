import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber } from 'class-validator';

export class MovieSeatsPurchaseDto {
  @ApiProperty()
  @IsInt()
  movieFunctionId: number;

  @ApiProperty()
  scheduledDate: string;

  @ApiProperty()
  @IsNumber({}, { each: true })
  seatsIds: number[];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateSeatDto {
  @ApiProperty()
  @IsNumber()
  seatNumber: number;

  @ApiProperty()
  @IsNumber()
  auditoriumId: number;
}

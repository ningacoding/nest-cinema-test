import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAuditoriumDto {
  @ApiProperty()
  @IsString()
  name: string;
}

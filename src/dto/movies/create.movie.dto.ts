import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsUrl()
  coverImageUrl: string;

  @ApiProperty()
  @IsInt()
  durationInMinutes: number;
}

import { Type } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';

export class CreatePersonDto {
  @Type(() => String)
  @IsString()
  @MaxLength(16)
  name: string;
}

import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class IdParamsDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsInt()
  id: number;
}

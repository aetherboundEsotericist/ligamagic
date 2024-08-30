import { Type } from 'class-transformer';
import { IsNumber, IsPositive, Max } from 'class-validator';

export class CreateOrderDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Max(2047)
  orderNumber: number;
}

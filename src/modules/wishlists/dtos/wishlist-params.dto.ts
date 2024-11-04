import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class WishlistParamsDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsInt()
  personId: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsInt()
  orderId: number;
}

import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateStoreDto } from 'src/modules/stores/dtos';

export class PutBuylistsBodyDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PutBuylistCardDto)
  buycards: PutBuylistCardDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateStoreDto)
  stores: CreateStoreDto[];
}

export class PutBuylistCardDto {
  @Type(() => String)
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @Type(() => String)
  @IsString()
  @Length(2, 5)
  edition: string;

  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(6)
  quality: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsInt()
  quantity: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsInt()
  storeId: number;
}

import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateStoreDto {
  @Type(() => Number)
  @IsPositive()
  @IsInt()
  id: number;

  @Type(() => String)
  @IsString()
  @MaxLength(16)
  name: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  @IsUrl()
  @MaxLength(255) // TODO: verificar tamanho depois
  website?: string;
}

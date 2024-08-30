import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateStoreDto {
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

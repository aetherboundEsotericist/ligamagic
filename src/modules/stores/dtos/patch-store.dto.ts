import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

// TODO: verificar exclusividade mutua dos parâmetros
export class PatchStoreDto {
  @Type(() => String)
  @IsString()
  @IsOptional()
  @MaxLength(16)
  name?: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  @IsUrl()
  @MaxLength(255) // TODO: verificar tamanho depois
  website?: string;
}

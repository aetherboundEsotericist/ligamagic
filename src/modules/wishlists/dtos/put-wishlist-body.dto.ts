import { Type } from 'class-transformer';
import { IsString, Matches } from 'class-validator';
import { LIGAMAGIC_WISHLIST_VALIDATION_PATTERN } from '../patterns';

export class PutWishlistBodyDto {
  @Type(() => String)
  @IsString()
  @Matches(LIGAMAGIC_WISHLIST_VALIDATION_PATTERN)
  wishlistString: string;
}

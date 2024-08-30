import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { PutWishlistParamsDto } from './dtos/put-wishlist-params.dto';
import { PutWishlistBodyDto } from './dtos/put-wishlist-body.dto';
import { LIGAMAGIC_WISHLIST_PARSING_PATTERN } from './patterns';
import { WishCardCreationInput } from './types';
import { IdParamsDto } from '../shared/dtos';

@Controller()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get('/orders/:id/wishlist')
  public async getOrderWishlist(@Param() params: IdParamsDto) {
    const { id } = params;
    return this.wishlistService.retrieveOrderWishlist(id);
  }

  @Put('/persons/:personId/orders/:orderId/wishlist')
  public async putWishlist(
    @Param() params: PutWishlistParamsDto,
    @Body() body: PutWishlistBodyDto,
  ) {
    const { orderId, personId } = params;
    const { wishlistString } = body;

    const matches = wishlistString.matchAll(LIGAMAGIC_WISHLIST_PARSING_PATTERN);
    const qualityMapping = {
      M: 0,
      NM: 1,
      SP: 2,
      MP: 3,
      HP: 4,
      D: 5,
    };

    const cards: WishCardCreationInput[] = [];
    for (const match of matches) {
      const [_, quantity, name, quality, edition] = match;

      cards.push({
        quantity: Number(quantity),
        name,
        quality: qualityMapping[quality],
        edition,
      });
    }

    this.wishlistService.createOrUpdateWishlist({ orderId, personId, cards });
  }
}

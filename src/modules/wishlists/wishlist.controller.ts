import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistParamsDto } from './dtos/wishlist-params.dto';
import { PutWishlistBodyDto } from './dtos/put-wishlist-body.dto';
import { LIGAMAGIC_WISHLIST_PARSING_PATTERN } from './patterns';
import { WishCardCreationInput } from './types';
import { IdParamsDto } from '../shared/dtos';

@Controller()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get('/orders/:id/wishlist')
  public async getOrderWishlists(@Param() params: IdParamsDto) {
    const { id } = params;
    return this.wishlistService.retrieveOrderWishlist(id);
  }

  @Get('/persons/:id/wishlist')
  public async getPersonWishlists(@Param() params: IdParamsDto) {
    const { id } = params;
    return this.wishlistService.retrievePersonWishlist(id);
  }

  @Put('/persons/:personId/orders/:orderId/wishlist')
  public async putWishlist(
    @Param() params: WishlistParamsDto,
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

    await this.wishlistService.createOrUpdateWishlist({
      orderId,
      personId,
      cards,
    });
  }

  @Delete('/persons/:personId/orders/:orderId/wishlist')
  public async deleteWishlist(@Param() params: WishlistParamsDto) {
    const { orderId, personId } = params;

    await this.wishlistService.removeWishlist({ orderId, personId });
  }
}

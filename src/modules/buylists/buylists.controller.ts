import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { BuylistsService } from './buylists.service';
import { IdParamsDto } from '../shared/dtos';
import { PutBuylistsBodyDto } from './dtos/put-buylists.dto';

@Controller()
export class BuylistsController {
  constructor(private readonly buylistsService: BuylistsService) {}

  @Put('/order/:id/buylist')
  public async putBuylist(
    @Param() params: IdParamsDto,
    @Body() body: PutBuylistsBodyDto,
  ) {
    const { id } = params;
    const { buycards, stores } = body;

    this.buylistsService.createOrUpdateBuylist(id, buycards, stores);
  }

  @Get('/order/:id/buylist')
  public async getBuylist(@Param() params: IdParamsDto) {
    const { id } = params;

    return await this.buylistsService.retrieveBuylist(id);
  }
}

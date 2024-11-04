import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IdParamsDto } from '../shared/dtos';
import { CreateOrderDto } from './dtos';
import { AssignmentList, WishBuyAttribution } from './types';
import { WishBuyAttributionDto } from './dtos/wish-buy-attribution.dto';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/')
  public async getOrders() {
    return await this.ordersService.listOrders();
  }

  @Post('/')
  public async postOrder(@Body() body: CreateOrderDto) {
    const { orderNumber } = body;

    return await this.ordersService.createOrder(orderNumber);
  }

  @Delete('/:id')
  public async deleteOrder(@Param() params: IdParamsDto) {
    const { id } = params;

    await this.ordersService.deleteOrder(id);
  }
  //
  @Get('/:id')
  public async getOrderAssignments(@Param() params: IdParamsDto) {
    const { id } = params;
    return await this.ordersService.generateAssignmentList(id);
  }

  @Patch('assign')
  public async assignOrderAttribution(@Body() body: WishBuyAttributionDto) {
    const { attributionList } = body;
    console.log(attributionList);

    return await this.ordersService.assignCards(attributionList);
  }

  @Patch('/clear/:id')
  public async clearOrderAttribution(@Param() params: IdParamsDto) {
    const { id } = params;
    return await this.ordersService.dissociateCards(id);
  }
}

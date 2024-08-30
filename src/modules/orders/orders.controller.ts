import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IdParamsDto } from '../shared/dtos';
import { CreateOrderDto } from './dtos';

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
}

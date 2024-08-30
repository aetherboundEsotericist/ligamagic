import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Order } from './types';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public async createOrder(orderNumber: number): Promise<Order> {
    const order = await this.prismaService.order.create({
      data: { orderNumber },
    });
    return order;
  }

  public async listOrders(): Promise<Order[]> {
    const orderList = await this.prismaService.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return orderList;
  }

  public async deleteOrder(id: number): Promise<void> {
    await this.prismaService.order.delete({ where: { id } });
  }
}

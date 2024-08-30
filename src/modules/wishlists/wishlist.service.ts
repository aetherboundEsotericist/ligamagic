import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { WishCard } from '@prisma/client';
import { WishCardCreationInput, WishlistCreationInput } from './types';

@Injectable()
export class WishlistService {
  constructor(private prismaService: PrismaService) {}

  public async createOrUpdateWishlist(data: WishlistCreationInput) {
    const { cards, orderId, personId } = data;

    return this.prismaService.$transaction([
      this.prismaService.wishCard.deleteMany({ where: { orderId, personId } }),
      this.prismaService.wishCard.createMany({
        data: cards.map((card) => {
          return {
            ...card,
            personId,
            orderId,
          };
        }),
      }),
    ]);
  }

  public async retrieveOrderWishlist(orderId: number) {
    return await this.prismaService.person.findMany({
      include: {
        wishCards: {
          select: { name: true, id: true, orderId: true },
          where: { orderId },
        },
      },
      where: { wishCards: { some: { orderId } } },
    });
  }

  /*
  public async listWishCards(): Promise<> {
    const orderList = await this.prismaService.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return orderList;
  }

  public async deleteOrder(id: number): Promise<void> {
    await this.prismaService.order.delete({ where: { id } });
  }





  (card) => {
        return {
          ...card,
          personId,
          orderId,
        };
      }
    */
}

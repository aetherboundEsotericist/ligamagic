import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { StoreCreationInput } from '../stores/types';
import { BuylistCardCreationInput } from './types';

@Injectable()
export class BuylistsService {
  constructor(private prismaService: PrismaService) {}

  public async createOrUpdateBuylist(
    orderId: number,
    buycards: BuylistCardCreationInput[],
    stores: StoreCreationInput[],
  ) {
    //vamo sidiverti
    await this.prismaService.$transaction([
      this.prismaService.store.createMany({
        data: stores,
        skipDuplicates: true,
      }),
      this.prismaService.buyCard.deleteMany({ where: { orderId } }),
      this.prismaService.buyCard.createMany({
        data: buycards.map((card) => {
          return { ...card, orderId };
        }),
      }),
    ]);
  }

  public async retrieveBuylist(orderId: number) {
    return await this.prismaService.buyCard.findMany({
      where: { orderId },
      orderBy: { name: 'asc' },
    });
  }
}

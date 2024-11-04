import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { BuyCard, WishCard } from '@prisma/client';
import {
  WishCardCreationInput,
  WishlistCreationInput,
  WishlistRemovalInput,
} from './types';
import { OnApplicationBootstrap } from '@nestjs/common';
import { debug } from 'console';

@Injectable()
export class WishlistService implements OnApplicationBootstrap {
  constructor(private prismaService: PrismaService) {}

  async onApplicationBootstrap() {
    //await this.generateAssignmentList(1);
  }

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
          select: { name: true, id: true },
          where: { orderId },
        },
      },
      where: { wishCards: { some: { orderId } } },
    });
  }

  public async retrievePersonWishlist(personId: number) {
    return await this.prismaService.order.findMany({
      include: {
        wishCards: { select: { name: true, id: true }, where: { personId } },
      },
      where: { wishCards: { some: { personId } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  public async removeWishlist(data: WishlistRemovalInput) {
    const { orderId, personId } = data;

    return await this.prismaService.wishCard.deleteMany({
      where: { orderId, personId },
    });
  }

  public async generateAssignmentList(orderId: number) {
    const wishlist = await this.prismaService.wishCard.findMany({
      where: { orderId },
    });

    const buylist = await this.prismaService.buyCard.findMany({
      where: { orderId },
    });

    const attributionMatrix: boolean[][] = [];

    for (let i = 0; i < wishlist.length; i++) {
      const wishCard = wishlist[i];
      const attributionRow: boolean[] = [];
      for (let j = 0; j < buylist.length; j++) {
        const buyCard = buylist[j];

        attributionRow.push(!this.isAttributionValid(wishCard, buyCard)); // inverts the bool result, as the attribution matrix uses a weight system where 0 (false) is the best match.
      }
      attributionMatrix.push(attributionRow);
    }

    this.displayMatrix(attributionMatrix);
    console.log();
    const results = [];
    this.hungarianAttributor(attributionMatrix, results);

    //for every possible solution
    for (let i = 0; i < results.length; i++) {
      console.log('Solution ' + (i + 1));
      this.displayMatrix(results[i]);
      console.log();

      this.assignMatrixToLists(results[i], wishlist, buylist);
    }

    /*
    console.log(
      wishlist,
      '\n-=-=-=-=-=-=-=-',
      buylist,
      '\n-=-=-=-=-=-=-=-',
      attributionMatrix,
    );*/
  }

  // attribution conditionals
  public isAttributionValid(wishCard: WishCard, buyCard: BuyCard): boolean {
    if (wishCard.name !== buyCard.name) return false;

    if (wishCard.quality < buyCard.quality) return false;

    if (wishCard.edition !== null && wishCard.edition !== buyCard.edition)
      return false;

    return true;
  }

  public hungarianAttributor(
    attributionMatrix: boolean[][],
    results: boolean[][][],
    line: number = 0,
  ) {
    if (line >= attributionMatrix.length) {
      const result = attributionMatrix.map((innerArray) => {
        return [...innerArray];
      });
      results.push(result);
      return true;
    }

    for (
      let columnToOverwrite = 0;
      columnToOverwrite < attributionMatrix[line].length;
      columnToOverwrite++
    ) {
      if (attributionMatrix[line][columnToOverwrite] == true) continue;
      const coveredLines: number[] = [];
      for (let i = 0; i < attributionMatrix.length; i++) {
        if (i == line) continue;
        if (attributionMatrix[i][columnToOverwrite] == true) continue;

        attributionMatrix[i][columnToOverwrite] = true;
        coveredLines.push(i);
      }

      this.hungarianAttributor(attributionMatrix, results, line + 1);

      for (let i = 0; i < coveredLines.length; i++) {
        attributionMatrix[coveredLines[i]][columnToOverwrite] = false;
      }
    }
    return false;
  }

  public displayMatrix(attributionMatrix: string | any[]) {
    for (let i = 0; i < attributionMatrix.length; i++) {
      for (let j = 0; j < attributionMatrix[i].length; j++) {
        process.stdout.write(String(+attributionMatrix[i][j]) + `-`);
      }
      console.log();
    }
  }

  public assignMatrixToLists(
    attributionMatrix: string | any[],
    wishlist: WishCard[],
    buylist: BuyCard[],
  ) {
    for (let i = 0; i < attributionMatrix.length; i++) {
      for (let j = 0; j < attributionMatrix[i].length; j++) {
        if (attributionMatrix[i][j] == 1) continue;
        console.log(
          wishlist[i].name +
            ' ' +
            wishlist[i].personId +
            ' assigned to card ' +
            buylist[j].name +
            ' ' +
            buylist[j].id,
        );
      }
      console.log();
    }
  }
}
//

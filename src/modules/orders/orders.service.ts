import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { WishBuyAttribution, Order, AssignmentList } from './types';
import { BuyCard, WishCard } from '@prisma/client';

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

    const possibleAssignments: AssignmentList[] = [];
    //for every possible solution
    for (let i = 0; i < results.length; i++) {
      console.log('Solution ' + (i + 1));
      this.displayMatrix(results[i]);
      console.log();

      const newPossibleAssignment = this.createAssignmentList(
        results[i],
        wishlist,
        buylist,
      );
      possibleAssignments.push(newPossibleAssignment);
    }
    //this.assignCards(possibleAttributions[0]); //placeholder, assigns cards according to the first possible attribution
    return possibleAssignments;
  }

  //
  //
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

  public createAssignmentList(
    attributionMatrix: string | any[],
    wishlist: WishCard[],
    buylist: BuyCard[],
  ) {
    const assignmentList: AssignmentList = [];
    for (let i = 0; i < attributionMatrix.length; i++) {
      for (let j = 0; j < attributionMatrix[i].length; j++) {
        if (attributionMatrix[i][j] == 1) continue;
        assignmentList.push({ buycard: buylist[j], wishcard: wishlist[i] });
      }
      console.log();
    }
    return assignmentList;
  }

  public async assignCards(attributionList: WishBuyAttribution[]) {
    for (let i = 0; i < attributionList.length; i++) {
      const { buycardId, wishcardId } = attributionList[i];
      console.log(buycardId + ' ' + wishcardId);
      await this.prismaService.buyCard.update({
        where: { id: buycardId },
        data: { wishcardId: wishcardId },
      });
    }
  }

  public async dissociateCards(orderId: number) {
    console.log('dissociating cards');
    await this.prismaService.buyCard.updateMany({
      where: { orderId },
      data: { wishcardId: null },
    });
  }
}

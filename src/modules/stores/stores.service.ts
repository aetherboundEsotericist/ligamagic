import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Store, StoreCreationInput, StoreEditionInput } from './types';

@Injectable()
export class StoresService {
  constructor(private prismaService: PrismaService) {}

  public async registerStore(data: StoreCreationInput): Promise<Store> {
    const store = await this.prismaService.store.create({ data });
    return store;
  }

  public async listStores(): Promise<Store[]> {
    const storeList = await this.prismaService.store.findMany({
      orderBy: { name: 'asc' },
    });
    return storeList;
  }

  public async editStore(data: StoreEditionInput): Promise<Store> {
    const { id, name, website } = data;

    const updatedStore = await this.prismaService.store.update({
      where: { id },
      data: { name, website },
    });
    return updatedStore;
  }

  public async removeStore(id: number): Promise<void> {
    await this.prismaService.store.delete({ where: { id } });
  }
}

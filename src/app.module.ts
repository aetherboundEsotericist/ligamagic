import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma';
import { PersonsModule } from './modules/persons/persons.module';
import { StoresModule } from './modules/stores/stores.module';
import { OrderModule } from './modules/orders/orders.module';
import { WishlistModule } from './modules/wishlists/wishlist.module';
import { BuylistsModule } from './modules/buylists/buylists.module';

@Module({
  imports: [
    PrismaModule,
    PersonsModule,
    StoresModule,
    OrderModule,
    WishlistModule,
    BuylistsModule,
  ],
})
export class AppModule {}

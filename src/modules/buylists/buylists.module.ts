import { Module } from '@nestjs/common';
import { BuylistsController } from './buylists.controller';
import { BuylistsService } from './buylists.service';

@Module({
  controllers: [BuylistsController],
  providers: [BuylistsService],
})
export class BuylistsModule {}

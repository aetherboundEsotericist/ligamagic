import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { IdParamsDto } from '../shared/dtos';
import { CreateStoreDto, PatchStoreDto } from './dtos';

@Controller('/stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get('/')
  public async getStores() {
    return await this.storesService.listStores();
  }

  @Post('/')
  public async postStore(@Body() body: CreateStoreDto) {
    const { id, name, website } = body;

    return await this.storesService.registerStore({ id, name, website });
  }

  @Patch('/:id')
  public async patchStore(
    @Param() params: IdParamsDto,
    @Body() body: PatchStoreDto,
  ) {
    const { id } = params;
    const { name, website } = body;

    return await this.storesService.editStore({ id, name, website });
  }

  @Delete('/:id')
  public async deleteStore(@Param() params: IdParamsDto) {
    const { id } = params;

    await this.storesService.removeStore(id);
  }
}

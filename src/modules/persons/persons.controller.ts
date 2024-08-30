import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { IdParamsDto } from '../shared/dtos';
import { CreatePersonDto, PatchPersonDto } from './dtos';

@Controller('/persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Get('/')
  public async getPersons() {
    return await this.personsService.listPersons();
  }

  @Post('/')
  public async postPerson(@Body() body: CreatePersonDto) {
    const { name } = body;

    return await this.personsService.registerPerson(name);
  }

  @Patch('/:id')
  public async patchPerson(
    @Param() params: IdParamsDto,
    @Body() body: PatchPersonDto,
  ) {
    const { id } = params;
    const { name } = body;

    return await this.personsService.editPersonName(id, name);
  }

  @Delete('/:id')
  public async deletePerson(@Param() params: IdParamsDto) {
    const { id } = params;

    await this.personsService.removePerson(id);
  }
}

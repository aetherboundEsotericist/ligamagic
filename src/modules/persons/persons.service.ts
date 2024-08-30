import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Person } from './types';

@Injectable()
export class PersonsService {
  constructor(private prismaService: PrismaService) {}

  public async registerPerson(name: string): Promise<Person> {
    const person = await this.prismaService.person.create({ data: { name } });
    return person;
  }

  public async listPersons(): Promise<Person[]> {
    const personList = await this.prismaService.person.findMany({
      orderBy: { name: 'asc' },
    });
    return personList;
  }

  public async editPersonName(id: number, newName: string): Promise<Person> {
    const updatedPerson = await this.prismaService.person.update({
      where: { id },
      data: { name: newName },
    });
    return updatedPerson;
  }

  public async removePerson(id: number): Promise<void> {
    await this.prismaService.person.delete({ where: { id } });
  }
}

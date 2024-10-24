import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLableDto } from './dto/update-label.dto';

@Injectable()
export class LabelService {
  constructor(private prisma: PrismaService) {}

  create(createLabelDto: CreateLabelDto) {
    return this.prisma.label.create({ data: createLabelDto });
  }

  findAll() {
    return this.prisma.label.findMany();
  }

  async findOne(id: number) {
    const label = await this.prisma.label.findUnique({ where: { id } });
    if (!label) {
      throw new NotFoundException(`Label with ID ${id} was not found`);
    }
    return label;
  }

  update(id: number, updateLableDto: UpdateLableDto) {
    return this.prisma.label.update({
      where: { id },
      data: updateLableDto,
    });
  }

  remove(id: number) {
    return this.prisma.label.delete({ where: { id } });
  }
}

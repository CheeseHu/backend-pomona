import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIntensityDto } from './dto/create-intensity.dto';
import { UpdateIntensityDto } from './dto/update-intensity.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class IntensitiesService {
  constructor(private prisma: PrismaService) {}

  async create(createIntensityDto: CreateIntensityDto) {
    return this.prisma.intensity.create({
      data: {
        ...createIntensityDto,
        startAbsorbance: createIntensityDto?.absorbance?.[0],
        startWavelength: createIntensityDto?.wavelength?.[0],
        endAbsorbance:
          createIntensityDto?.absorbance?.[
            createIntensityDto?.absorbance?.length - 1
          ],
        endWavelength:
          createIntensityDto?.wavelength?.[
            createIntensityDto?.wavelength?.length - 1
          ],
      },
    });
  }

  async findAll() {
    //  const servicesToSkip = (page - 1) * offset;
    const query: Prisma.IntensityWhereInput = {
      //  name: {
      //    contains: name,
      //    mode: 'insensitive',
      //  },
    };
    const [count, intensities] = await this.prisma.$transaction([
      this.prisma.intensity.count({ where: query }),
      this.prisma.intensity.findMany({
        // skip: intensitiesToSkip,
        // take: Number(offset),
        where: query,
        orderBy: { createdAt: 'asc' },
      }),
    ]);

    return {
      pagination: {
        total: count,
      },
      data: intensities,
    };
    // return this.prisma.intensity.findMany();
  }

  async findOne(id: number) {
    const intensity = await this.prisma.intensity.findUnique({ where: { id } });
    if (!intensity) {
      throw new NotFoundException(`Intensity with ID ${id} was not found`);
    }
    return intensity;
  }

  async update(id: number, updateIntensityDto: UpdateIntensityDto) {
    return this.prisma.intensity.update({
      where: { id },
      data: updateIntensityDto,
    });
  }

  async remove(id: number) {
    return this.prisma.intensity.delete({ where: { id } });
  }
}

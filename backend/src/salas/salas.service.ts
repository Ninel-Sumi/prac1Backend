// src/salas/salas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sala } from './entities/sala.entity.js';
import { CreateSalaDto } from './dto/create-sala.dto.js';
import { UpdateSalaDto } from './dto/update-sala.dto.js';

@Injectable()
export class SalasService {
  constructor(
    @InjectRepository(Sala)
    private readonly repositorio: Repository<Sala>,
  ) {}

  async findAll(): Promise<Sala[]> {
    return await this.repositorio.find();
  }

  async findOne(id: number): Promise<Sala> {
    const sala = await this.repositorio.findOne({
      where: { idSala: id },
      relations: { funciones: true },
    });
    if (!sala) {
      throw new NotFoundException(`La sala con id ${id} no existe`);
    }
    return sala;
  }

  async create(createSalaDto: CreateSalaDto): Promise<Sala> {
    const sala = this.repositorio.create(createSalaDto);
    return await this.repositorio.save(sala);
  }

  async update(id: number, updateSalaDto: UpdateSalaDto): Promise<Sala> {
    const sala = await this.findOne(id);
    Object.assign(sala, updateSalaDto);
    return await this.repositorio.save(sala);
  }

  async remove(id: number): Promise<{ mensaje: string }> {
    const resultado = await this.repositorio.softDelete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`La sala con id ${id} no existe`);
    }
    return { mensaje: 'Sala eliminada' };
  }
}

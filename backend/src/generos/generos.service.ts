// src/generos/generos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genero } from './entities/genero.entity.js';
import { CreateGeneroDto } from './dto/create-genero.dto.js';
import { UpdateGeneroDto } from './dto/update-genero.dto.js';

@Injectable()
export class GenerosService {
  constructor(
    @InjectRepository(Genero)
    private readonly repositorio: Repository<Genero>,
  ) {}

  async findAll(): Promise<Genero[]> {
    return await this.repositorio.find();
  }

  async findOne(id: number): Promise<Genero> {
    const genero = await this.repositorio.findOne({
      where: { idGenero: id },
      relations: { peliculas: true },
    });
    if (!genero) {
      throw new NotFoundException(`El género con id ${id} no existe`);
    }
    return genero;
  }

  async create(createGeneroDto: CreateGeneroDto): Promise<Genero> {
    const genero = this.repositorio.create(createGeneroDto);
    return await this.repositorio.save(genero);
  }

  async update(id: number, updateGeneroDto: UpdateGeneroDto): Promise<Genero> {
    const genero = await this.findOne(id);
    Object.assign(genero, updateGeneroDto);
    return await this.repositorio.save(genero);
  }

  async remove(id: number): Promise<{ mensaje: string }> {
    const resultado = await this.repositorio.softDelete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`El género con id ${id} no existe`);
    }
    return { mensaje: 'Género eliminado' };
  }
}

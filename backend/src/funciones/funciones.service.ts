// src/funciones/funciones.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcion } from './entities/funcion.entity.js';
import { Sala } from '../salas/entities/sala.entity.js';
import { Pelicula } from '../peliculas/entities/pelicula.entity.js';
import { CreateFuncionDto } from './dto/create-funcion.dto.js';
import { UpdateFuncionDto } from './dto/update-funcion.dto.js';

@Injectable()
export class FuncionesService {
  constructor(
    @InjectRepository(Funcion)
    private readonly repositorio: Repository<Funcion>,
    @InjectRepository(Sala)
    private readonly salaRepositorio: Repository<Sala>,
    @InjectRepository(Pelicula)
    private readonly peliculaRepositorio: Repository<Pelicula>,
  ) {}

  async findAll(): Promise<Funcion[]> {
    return await this.repositorio.find({
      relations: { sala: true, pelicula: true },
    });
  }

  async findOne(id: number): Promise<Funcion> {
    const funcion = await this.repositorio.findOne({
      where: { idFuncion: id },
      relations: { sala: true, pelicula: true, boletos: true },
    });
    if (!funcion) {
      throw new NotFoundException(`La función con id ${id} no existe`);
    }
    return funcion;
  }

  async create(createFuncionDto: CreateFuncionDto): Promise<Funcion> {
    const sala = await this.salaRepositorio.findOneBy({
      idSala: createFuncionDto.idSala,
    });
    if (!sala) {
      throw new NotFoundException(
        `La sala con id ${createFuncionDto.idSala} no existe`,
      );
    }

    const pelicula = await this.peliculaRepositorio.findOneBy({
      idPelicula: createFuncionDto.idPelicula,
    });
    if (!pelicula) {
      throw new NotFoundException(
        `La película con id ${createFuncionDto.idPelicula} no existe`,
      );
    }

    const funcion = this.repositorio.create({
      ...createFuncionDto,
      fechaHora: new Date(createFuncionDto.fechaHora),
    });

    return await this.repositorio.save(funcion);
  }

  async update(id: number, updateFuncionDto: UpdateFuncionDto): Promise<Funcion> {
    const funcion = await this.findOne(id);

    if (updateFuncionDto.idSala !== undefined) {
      const sala = await this.salaRepositorio.findOneBy({
        idSala: updateFuncionDto.idSala,
      });
      if (!sala) {
        throw new NotFoundException(
          `La sala con id ${updateFuncionDto.idSala} no existe`,
        );
      }
      funcion.sala = sala;
    }

    if (updateFuncionDto.idPelicula !== undefined) {
      const pelicula = await this.peliculaRepositorio.findOneBy({
        idPelicula: updateFuncionDto.idPelicula,
      });
      if (!pelicula) {
        throw new NotFoundException(
          `La película con id ${updateFuncionDto.idPelicula} no existe`,
        );
      }
      funcion.pelicula = pelicula;
    }

    if (updateFuncionDto.fechaHora !== undefined) {
      funcion.fechaHora = new Date(updateFuncionDto.fechaHora);
    }

    if (updateFuncionDto.precio !== undefined) {
      funcion.precio = updateFuncionDto.precio;
    }

    if (updateFuncionDto.idSala !== undefined) {
      funcion.idSala = updateFuncionDto.idSala;
    }

    if (updateFuncionDto.idPelicula !== undefined) {
      funcion.idPelicula = updateFuncionDto.idPelicula;
    }

    return await this.repositorio.save(funcion);
  }

  async remove(id: number): Promise<{ mensaje: string }> {
    const resultado = await this.repositorio.softDelete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`La función con id ${id} no existe`);
    }
    return { mensaje: 'Función eliminada' };
  }
}

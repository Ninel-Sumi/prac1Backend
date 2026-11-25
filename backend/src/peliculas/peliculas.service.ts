// src/peliculas/peliculas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Pelicula } from './entities/pelicula.entity.js';
import { Genero } from '../generos/entities/genero.entity.js';
import { CreatePeliculaDto } from './dto/create-pelicula.dto.js';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto.js';

@Injectable()
export class PeliculasService {
  constructor(
    @InjectRepository(Pelicula)
    private readonly repositorio: Repository<Pelicula>,
    @InjectRepository(Genero)
    private readonly generoRepositorio: Repository<Genero>,
  ) {}

  private async buscarGenerosPorIds(idGeneros: number[]): Promise<Genero[]> {
    const idsUnicos = [...new Set(idGeneros)];
    const generos = await this.generoRepositorio.findBy({
      idGenero: In(idsUnicos),
    });

    if (generos.length !== idsUnicos.length) {
      const encontrados = new Set(generos.map((g) => g.idGenero));
      const faltantes = idsUnicos.filter((id) => !encontrados.has(id));
      throw new NotFoundException(
        `No existen los géneros con id: ${faltantes.join(', ')}`,
      );
    }

    return generos;
  }

  async findAll(): Promise<Pelicula[]> {
    return await this.repositorio.find({
      relations: { generos: true },
    });
  }

  async findOne(id: number): Promise<Pelicula> {
    const pelicula = await this.repositorio.findOne({
      where: { idPelicula: id },
      relations: { generos: true, funciones: true },
    });
    if (!pelicula) {
      throw new NotFoundException(`La película con id ${id} no existe`);
    }
    return pelicula;
  }

  async create(createPeliculaDto: CreatePeliculaDto): Promise<Pelicula> {
    const { idGeneros, ...datosPelicula } = createPeliculaDto;
    const pelicula = this.repositorio.create(datosPelicula);

    if (idGeneros && idGeneros.length > 0) {
      pelicula.generos = await this.buscarGenerosPorIds(idGeneros);
    }

    return await this.repositorio.save(pelicula);
  }

  async update(id: number, updatePeliculaDto: UpdatePeliculaDto): Promise<Pelicula> {
    const pelicula = await this.findOne(id);
    const { idGeneros, ...datosPelicula } = updatePeliculaDto;

    Object.assign(pelicula, datosPelicula);

    if (idGeneros !== undefined) {
      pelicula.generos =
        idGeneros.length > 0 ? await this.buscarGenerosPorIds(idGeneros) : [];
    }

    return await this.repositorio.save(pelicula);
  }

  async remove(id: number): Promise<{ mensaje: string }> {
    const resultado = await this.repositorio.softDelete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`La película con id ${id} no existe`);
    }
    return { mensaje: 'Película eliminada' };
  }

  async asignarGeneros(id: number, idGeneros: number[]): Promise<Pelicula> {
    const pelicula = await this.findOne(id);
    const nuevosGeneros = await this.buscarGenerosPorIds(idGeneros);

    const mapaGeneros = new Map<number, Genero>();
    for (const g of pelicula.generos ?? []) {
      mapaGeneros.set(g.idGenero, g);
    }
    for (const g of nuevosGeneros) {
      mapaGeneros.set(g.idGenero, g);
    }

    pelicula.generos = Array.from(mapaGeneros.values());
    return await this.repositorio.save(pelicula);
  }

  async quitarGenero(id: number, idGenero: number): Promise<Pelicula> {
    const pelicula = await this.findOne(id);
    const generoExiste = await this.generoRepositorio.findOneBy({ idGenero });
    if (!generoExiste) {
      throw new NotFoundException(`El género con id ${idGenero} no existe`);
    }

    const estabaAsignado = (pelicula.generos ?? []).some(
      (g) => g.idGenero === idGenero,
    );
    if (!estabaAsignado) {
      throw new NotFoundException(
        `La película con id ${id} no tiene asignado el género con id ${idGenero}`,
      );
    }

    pelicula.generos = pelicula.generos.filter((g) => g.idGenero !== idGenero);
    return await this.repositorio.save(pelicula);
  }
}

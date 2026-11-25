// src/peliculas/peliculas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pelicula } from './entities/pelicula.entity.js';
import { Genero } from '../generos/entities/genero.entity.js';
import { PeliculasController } from './peliculas.controller.js';
import { PeliculasService } from './peliculas.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Pelicula, Genero])],
  controllers: [PeliculasController],
  providers: [PeliculasService],
  exports: [TypeOrmModule],
})
export class PeliculasModule {}

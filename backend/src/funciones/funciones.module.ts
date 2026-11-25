// src/funciones/funciones.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcion } from './entities/funcion.entity.js';
import { Sala } from '../salas/entities/sala.entity.js';
import { Pelicula } from '../peliculas/entities/pelicula.entity.js';
import { FuncionesController } from './funciones.controller.js';
import { FuncionesService } from './funciones.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Funcion, Sala, Pelicula])],
  controllers: [FuncionesController],
  providers: [FuncionesService],
  exports: [TypeOrmModule],
})
export class FuncionesModule {}

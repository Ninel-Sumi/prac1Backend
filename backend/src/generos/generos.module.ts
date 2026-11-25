// src/generos/generos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genero } from './entities/genero.entity.js';
import { GenerosController } from './generos.controller.js';
import { GenerosService } from './generos.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Genero])],
  controllers: [GenerosController],
  providers: [GenerosService],
  exports: [TypeOrmModule],
})
export class GenerosModule {}

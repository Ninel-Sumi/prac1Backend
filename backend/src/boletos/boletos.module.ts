// src/boletos/boletos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boleto } from './entities/boleto.entity.js';
import { Funcion } from '../funciones/entities/funcion.entity.js';
import { Cliente } from '../clientes/entities/cliente.entity.js';
import { BoletosController } from './boletos.controller.js';
import { BoletosService } from './boletos.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Boleto, Funcion, Cliente])],
  controllers: [BoletosController],
  providers: [BoletosService],
  exports: [TypeOrmModule],
})
export class BoletosModule {}

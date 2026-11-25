// src/boletos/boletos.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Boleto } from './entities/boleto.entity.js';
import { Funcion } from '../funciones/entities/funcion.entity.js';
import { Cliente } from '../clientes/entities/cliente.entity.js';
import { CreateBoletoDto } from './dto/create-boleto.dto.js';
import { UpdateBoletoDto } from './dto/update-boleto.dto.js';

@Injectable()
export class BoletosService {
  constructor(
    @InjectRepository(Boleto)
    private readonly repositorio: Repository<Boleto>,
    @InjectRepository(Funcion)
    private readonly funcionRepositorio: Repository<Funcion>,
    @InjectRepository(Cliente)
    private readonly clienteRepositorio: Repository<Cliente>,
  ) {}

  private async validarFuncionYSala(idFuncion: number): Promise<Funcion> {
    const funcion = await this.funcionRepositorio.findOne({
      where: { idFuncion },
      relations: { sala: true },
    });
    if (!funcion) {
      throw new NotFoundException(`La función con id ${idFuncion} no existe`);
    }
    return funcion;
  }

  private async validarAsientoDisponible(
    idFuncion: number,
    numeroAsiento: number,
    capacidadSala: number,
    idBoletoExcluir?: number,
  ): Promise<void> {
    if (numeroAsiento < 1 || numeroAsiento > capacidadSala) {
      throw new BadRequestException(
        `El número de asiento ${numeroAsiento} está fuera de rango (debe estar entre 1 y ${capacidadSala})`,
      );
    }

    const ocupado = await this.repositorio.findOne({
      where: idBoletoExcluir
        ? { idFuncion, numeroAsiento, idBoleto: Not(idBoletoExcluir) }
        : { idFuncion, numeroAsiento },
    });

    if (ocupado) {
      throw new BadRequestException(
        `El asiento ${numeroAsiento} ya está ocupado para la función con id ${idFuncion}`,
      );
    }
  }

  async findAll(): Promise<Boleto[]> {
    return await this.repositorio.find({
      relations: { funcion: true, cliente: true },
    });
  }

  async findOne(id: number): Promise<Boleto> {
    const boleto = await this.repositorio.findOne({
      where: { idBoleto: id },
      relations: { funcion: true, cliente: true },
    });
    if (!boleto) {
      throw new NotFoundException(`El boleto con id ${id} no existe`);
    }
    return boleto;
  }

  async create(createBoletoDto: CreateBoletoDto): Promise<Boleto> {
    const funcion = await this.validarFuncionYSala(createBoletoDto.idFuncion);

    const cliente = await this.clienteRepositorio.findOneBy({
      idCliente: createBoletoDto.idCliente,
    });
    if (!cliente) {
      throw new NotFoundException(
        `El cliente con id ${createBoletoDto.idCliente} no existe`,
      );
    }

    await this.validarAsientoDisponible(
      funcion.idFuncion,
      createBoletoDto.numeroAsiento,
      funcion.sala.capacidad,
    );

    const boleto = this.repositorio.create({
      idFuncion: createBoletoDto.idFuncion,
      idCliente: createBoletoDto.idCliente,
      numeroAsiento: createBoletoDto.numeroAsiento,
      precioPagado: createBoletoDto.precioPagado ?? funcion.precio,
    });

    return await this.repositorio.save(boleto);
  }

  async update(id: number, updateBoletoDto: UpdateBoletoDto): Promise<Boleto> {
    const boleto = await this.findOne(id);

    const idFuncionFinal = updateBoletoDto.idFuncion ?? boleto.idFuncion;
    const numeroAsientoFinal =
      updateBoletoDto.numeroAsiento ?? boleto.numeroAsiento;

    const funcion = await this.validarFuncionYSala(idFuncionFinal);

    if (updateBoletoDto.idCliente !== undefined) {
      const cliente = await this.clienteRepositorio.findOneBy({
        idCliente: updateBoletoDto.idCliente,
      });
      if (!cliente) {
        throw new NotFoundException(
          `El cliente con id ${updateBoletoDto.idCliente} no existe`,
        );
      }
      boleto.idCliente = updateBoletoDto.idCliente;
      boleto.cliente = cliente;
    }

    await this.validarAsientoDisponible(
      idFuncionFinal,
      numeroAsientoFinal,
      funcion.sala.capacidad,
      id,
    );

    boleto.idFuncion = idFuncionFinal;
    boleto.funcion = funcion;
    boleto.numeroAsiento = numeroAsientoFinal;

    if (updateBoletoDto.precioPagado !== undefined) {
      boleto.precioPagado = updateBoletoDto.precioPagado;
    }

    return await this.repositorio.save(boleto);
  }

  async remove(id: number): Promise<{ mensaje: string }> {
    const resultado = await this.repositorio.softDelete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`El boleto con id ${id} no existe`);
    }
    return { mensaje: 'Boleto anulado' };
  }
}

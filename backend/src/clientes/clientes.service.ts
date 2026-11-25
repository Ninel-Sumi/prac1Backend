// src/clientes/clientes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly repositorio: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return await this.repositorio.find();
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.repositorio.findOne({
      where: { idCliente: id },
      relations: { boletos: { funcion: true } },
    });
    if (!cliente) {
      throw new NotFoundException(`El cliente con id ${id} no existe`);
    }
    return cliente;
  }

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.repositorio.create(createClienteDto);
    return await this.repositorio.save(cliente);
  }

  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id);
    Object.assign(cliente, updateClienteDto);
    return await this.repositorio.save(cliente);
  }

  async remove(id: number): Promise<{ mensaje: string }> {
    const resultado = await this.repositorio.softDelete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`El cliente con id ${id} no existe`);
    }
    return { mensaje: 'Cliente eliminado' };
  }
}

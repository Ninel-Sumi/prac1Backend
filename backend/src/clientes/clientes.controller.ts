// src/clientes/clientes.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { ClientesService } from './clientes.service.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';
import { Cliente } from './entities/cliente.entity.js';

@ApiTags('Clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes obtenida correctamente' })
  findAll(): Promise<Cliente[]> {
    return this.clientesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por id (incluye sus boletos y funciones)' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado' })
  @ApiResponse({ status: 400, description: 'El parámetro id no es válido' })
  @ApiResponse({ status: 404, description: 'El cliente no existe' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
    return this.clientesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un cliente' })
  @ApiResponse({ status: 201, description: 'Cliente creado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
    return this.clientesService.create(createClienteDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar los datos de un cliente' })
  @ApiResponse({ status: 200, description: 'Cliente actualizado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos o id inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'El cliente no existe' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    return this.clientesService.update(id, updateClienteDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar un cliente (borrado lógico)' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado correctamente' })
  @ApiResponse({ status: 400, description: 'El parámetro id no es válido' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'El cliente no existe' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ mensaje: string }> {
    return this.clientesService.remove(id);
  }
}

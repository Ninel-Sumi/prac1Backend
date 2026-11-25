// src/boletos/boletos.controller.ts
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
import { BoletosService } from './boletos.service.js';
import { CreateBoletoDto } from './dto/create-boleto.dto.js';
import { UpdateBoletoDto } from './dto/update-boleto.dto.js';
import { Boleto } from './entities/boleto.entity.js';

@ApiTags('Boletos')
@Controller('boletos')
export class BoletosController {
  constructor(private readonly boletosService: BoletosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los boletos' })
  @ApiResponse({ status: 200, description: 'Lista de boletos obtenida correctamente' })
  findAll(): Promise<Boleto[]> {
    return this.boletosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un boleto por id (incluye su función y cliente)' })
  @ApiResponse({ status: 200, description: 'Boleto encontrado' })
  @ApiResponse({ status: 400, description: 'El parámetro id no es válido' })
  @ApiResponse({ status: 404, description: 'El boleto no existe' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Boleto> {
    return this.boletosService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Vender un boleto (valida disponibilidad de asiento y capacidad)' })
  @ApiResponse({ status: 201, description: 'Boleto vendido correctamente' })
  @ApiResponse({ status: 400, description: 'Asiento ocupado, fuera de rango o datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La función o el cliente no existe' })
  create(@Body() createBoletoDto: CreateBoletoDto): Promise<Boleto> {
    return this.boletosService.create(createBoletoDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un boleto (valida reglas de asiento y rango)' })
  @ApiResponse({ status: 200, description: 'Boleto actualizado correctamente' })
  @ApiResponse({ status: 400, description: 'Asiento ocupado, fuera de rango o datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'El boleto, función o cliente no existe' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoletoDto: UpdateBoletoDto,
  ): Promise<Boleto> {
    return this.boletosService.update(id, updateBoletoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Anular un boleto (borrado lógico)' })
  @ApiResponse({ status: 200, description: 'Boleto anulado correctamente' })
  @ApiResponse({ status: 400, description: 'El parámetro id no es válido' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'El boleto no existe' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ mensaje: string }> {
    return this.boletosService.remove(id);
  }
}

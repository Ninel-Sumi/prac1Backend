// src/salas/salas.controller.ts
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
import { SalasService } from './salas.service.js';
import { CreateSalaDto } from './dto/create-sala.dto.js';
import { UpdateSalaDto } from './dto/update-sala.dto.js';
import { Sala } from './entities/sala.entity.js';

@ApiTags('Salas')
@Controller('salas')
export class SalasController {
  constructor(private readonly salasService: SalasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las salas' })
  @ApiResponse({ status: 200, description: 'Lista de salas obtenida correctamente' })
  findAll(): Promise<Sala[]> {
    return this.salasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una sala por id (incluye sus funciones)' })
  @ApiResponse({ status: 200, description: 'Sala encontrada' })
  @ApiResponse({ status: 400, description: 'El parámetro id no es válido' })
  @ApiResponse({ status: 404, description: 'La sala no existe' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Sala> {
    return this.salasService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una sala' })
  @ApiResponse({ status: 201, description: 'Sala creada correctamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() createSalaDto: CreateSalaDto): Promise<Sala> {
    return this.salasService.create(createSalaDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una sala' })
  @ApiResponse({ status: 200, description: 'Sala actualizada correctamente' })
  @ApiResponse({ status: 400, description: 'Datos o id inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La sala no existe' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSalaDto: UpdateSalaDto,
  ): Promise<Sala> {
    return this.salasService.update(id, updateSalaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar una sala (borrado lógico)' })
  @ApiResponse({ status: 200, description: 'Sala eliminada correctamente' })
  @ApiResponse({ status: 400, description: 'El parámetro id no es válido' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La sala no existe' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ mensaje: string }> {
    return this.salasService.remove(id);
  }
}

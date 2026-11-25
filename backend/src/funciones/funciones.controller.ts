// src/funciones/funciones.controller.ts
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
import { FuncionesService } from './funciones.service.js';
import { CreateFuncionDto } from './dto/create-funcion.dto.js';
import { UpdateFuncionDto } from './dto/update-funcion.dto.js';
import { Funcion } from './entities/funcion.entity.js';

@ApiTags('Funciones')
@Controller('funciones')
export class FuncionesController {
  constructor(private readonly funcionesService: FuncionesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las funciones (incluye sala y película)' })
  @ApiResponse({ status: 200, description: 'Lista de funciones obtenida correctamente' })
  findAll(): Promise<Funcion[]> {
    return this.funcionesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una función por id (incluye sala, película y boletos)' })
  @ApiResponse({ status: 200, description: 'Función encontrada' })
  @ApiResponse({ status: 400, description: 'El parámetro id no es válido' })
  @ApiResponse({ status: 404, description: 'La función no existe' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Funcion> {
    return this.funcionesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una función (requiere idSala e idPelicula existentes)' })
  @ApiResponse({ status: 201, description: 'Función creada correctamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La sala o la película no existe' })
  create(@Body() createFuncionDto: CreateFuncionDto): Promise<Funcion> {
    return this.funcionesService.create(createFuncionDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una función' })
  @ApiResponse({ status: 200, description: 'Función actualizada correctamente' })
  @ApiResponse({ status: 400, description: 'Datos o id inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La función, sala o película no existe' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFuncionDto: UpdateFuncionDto,
  ): Promise<Funcion> {
    return this.funcionesService.update(id, updateFuncionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar una función (borrado lógico)' })
  @ApiResponse({ status: 200, description: 'Función eliminada correctamente' })
  @ApiResponse({ status: 400, description: 'El parámetro id no es válido' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La función no existe' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ mensaje: string }> {
    return this.funcionesService.remove(id);
  }
}

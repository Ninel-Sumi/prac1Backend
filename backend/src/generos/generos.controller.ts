// src/generos/generos.controller.ts
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
import { GenerosService } from './generos.service.js';
import { CreateGeneroDto } from './dto/create-genero.dto.js';
import { UpdateGeneroDto } from './dto/update-genero.dto.js';
import { Genero } from './entities/genero.entity.js';

@ApiTags('Géneros')
@Controller('generos')
export class GenerosController {
  constructor(private readonly generosService: GenerosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los géneros' })
  @ApiResponse({ status: 200, description: 'Lista de géneros obtenida correctamente' })
  findAll(): Promise<Genero[]> {
    return this.generosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un género por id (incluye sus películas)' })
  @ApiResponse({ status: 200, description: 'Género encontrado' })
  @ApiResponse({ status: 400, description: 'El parámetro id no es válido' })
  @ApiResponse({ status: 404, description: 'El género no existe' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Genero> {
    return this.generosService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un género' })
  @ApiResponse({ status: 201, description: 'Género creado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() createGeneroDto: CreateGeneroDto): Promise<Genero> {
    return this.generosService.create(createGeneroDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un género' })
  @ApiResponse({ status: 200, description: 'Género actualizado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos o id inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'El género no existe' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGeneroDto: UpdateGeneroDto,
  ): Promise<Genero> {
    return this.generosService.update(id, updateGeneroDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar un género (borrado lógico)' })
  @ApiResponse({ status: 200, description: 'Género eliminado correctamente' })
  @ApiResponse({ status: 400, description: 'El parámetro id no es válido' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'El género no existe' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ mensaje: string }> {
    return this.generosService.remove(id);
  }
}

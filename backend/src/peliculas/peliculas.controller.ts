// src/peliculas/peliculas.controller.ts
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
import { PeliculasService } from './peliculas.service.js';
import { CreatePeliculaDto } from './dto/create-pelicula.dto.js';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto.js';
import { AsignarGenerosDto } from './dto/asignar-generos.dto.js';
import { Pelicula } from './entities/pelicula.entity.js';

@ApiTags('Películas')
@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly peliculasService: PeliculasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las películas (incluye sus géneros)' })
  @ApiResponse({ status: 200, description: 'Lista de películas obtenida correctamente' })
  findAll(): Promise<Pelicula[]> {
    return this.peliculasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una película por id (incluye géneros y funciones)' })
  @ApiResponse({ status: 200, description: 'Película encontrada' })
  @ApiResponse({ status: 400, description: 'El parámetro id no es válido' })
  @ApiResponse({ status: 404, description: 'La película no existe' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Pelicula> {
    return this.peliculasService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una película (con géneros opcionales)' })
  @ApiResponse({ status: 201, description: 'Película creada correctamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Alguno de los géneros indicados no existe' })
  create(@Body() createPeliculaDto: CreatePeliculaDto): Promise<Pelicula> {
    return this.peliculasService.create(createPeliculaDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar los datos de una película' })
  @ApiResponse({ status: 200, description: 'Película actualizada correctamente' })
  @ApiResponse({ status: 400, description: 'Datos o id inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La película o algún género no existe' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePeliculaDto: UpdatePeliculaDto,
  ): Promise<Pelicula> {
    return this.peliculasService.update(id, updatePeliculaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar una película (borrado lógico)' })
  @ApiResponse({ status: 200, description: 'Película eliminada correctamente' })
  @ApiResponse({ status: 400, description: 'El parámetro id no es válido' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La película no existe' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ mensaje: string }> {
    return this.peliculasService.remove(id);
  }

  @Post(':id/generos')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Asignar uno o más géneros a una película' })
  @ApiResponse({ status: 200, description: 'Géneros asignados correctamente' })
  @ApiResponse({ status: 400, description: 'Datos o id inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La película o algún género no existe' })
  asignarGeneros(
    @Param('id', ParseIntPipe) id: number,
    @Body() asignarGenerosDto: AsignarGenerosDto,
  ): Promise<Pelicula> {
    return this.peliculasService.asignarGeneros(id, asignarGenerosDto.idGeneros);
  }

  @Delete(':id/generos/:idGenero')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Quitar un género de una película' })
  @ApiResponse({ status: 200, description: 'Género quitado de la película' })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La película o el género no existe' })
  quitarGenero(
    @Param('id', ParseIntPipe) id: number,
    @Param('idGenero', ParseIntPipe) idGenero: number,
  ): Promise<Pelicula> {
    return this.peliculasService.quitarGenero(id, idGenero);
  }
}

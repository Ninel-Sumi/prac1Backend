// src/peliculas/dto/create-pelicula.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreatePeliculaDto {
  @ApiProperty({ example: 'Inception', description: 'Título de la película' })
  @IsString({ message: 'El título debe ser una cadena' })
  @IsNotEmpty({ message: 'El título no puede ir vacío' })
  @Length(2, 150, { message: 'El título debe tener entre 2 y 150 caracteres' })
  titulo: string;

  @ApiProperty({
    example: 'Un ladrón que roba secretos a través de los sueños.',
    description: 'Sinopsis de la película',
  })
  @IsString({ message: 'La sinopsis debe ser una cadena' })
  @IsNotEmpty({ message: 'La sinopsis no puede ir vacía' })
  sinopsis: string;

  @ApiProperty({ example: 148, description: 'Duración en minutos' })
  @IsInt({ message: 'La duración debe ser un número entero' })
  @IsPositive({ message: 'La duración debe ser mayor a 0' })
  duracionMin: number;

  @ApiProperty({ example: '+13', enum: ['ATP', '+13', '+18'], description: 'Clasificación por edad' })
  @IsString({ message: 'La clasificación debe ser una cadena' })
  @IsIn(['ATP', '+13', '+18'], { message: 'La clasificación debe ser ATP, +13 o +18' })
  clasificacion: string;

  @ApiPropertyOptional({
    example: [1, 2],
    type: [Number],
    description: 'Lista opcional de IDs de géneros a asignar',
  })
  @IsOptional()
  @IsArray({ message: 'idGeneros debe ser un arreglo de números' })
  @IsInt({ each: true, message: 'Cada idGenero debe ser un número entero' })
  @IsPositive({ each: true, message: 'Cada idGenero debe ser mayor a 0' })
  idGeneros?: number[];
}

// src/funciones/dto/create-funcion.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateFuncionDto {
  @ApiProperty({ example: 1, description: 'ID de la sala donde se proyecta la función' })
  @IsInt({ message: 'idSala debe ser un número entero' })
  @IsPositive({ message: 'idSala debe ser mayor a 0' })
  idSala: number;

  @ApiProperty({ example: 1, description: 'ID de la película que se proyecta' })
  @IsInt({ message: 'idPelicula debe ser un número entero' })
  @IsPositive({ message: 'idPelicula debe ser mayor a 0' })
  idPelicula: number;

  @ApiProperty({
    example: '2026-11-25T19:30:00',
    description: 'Fecha y hora de la función en formato ISO 8601',
  })
  @IsDateString({}, { message: 'fechaHora debe ser una fecha y hora válida en formato ISO' })
  fechaHora: string;

  @ApiProperty({ example: 45.5, description: 'Precio del boleto para la función' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio debe ser un número válido con hasta 2 decimales' })
  @IsPositive({ message: 'El precio debe ser mayor a 0' })
  precio: number;
}

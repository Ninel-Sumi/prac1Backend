// src/peliculas/dto/asignar-generos.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsInt, IsPositive } from 'class-validator';

export class AsignarGenerosDto {
  @ApiProperty({
    example: [1, 2],
    type: [Number],
    description: 'Arreglo de IDs de géneros a asignar a la película',
  })
  @IsArray({ message: 'idGeneros debe ser un arreglo' })
  @ArrayNotEmpty({ message: 'Debe enviar al menos un idGenero' })
  @IsInt({ each: true, message: 'Cada idGenero debe ser un número entero' })
  @IsPositive({ each: true, message: 'Cada idGenero debe ser mayor a 0' })
  idGeneros: number[];
}

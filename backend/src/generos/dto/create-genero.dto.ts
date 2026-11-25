// src/generos/dto/create-genero.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateGeneroDto {
  @ApiProperty({ example: 'Acción', description: 'Nombre del género cinematográfico' })
  @IsString({ message: 'El nombre debe ser una cadena' })
  @IsNotEmpty({ message: 'El nombre no puede ir vacío' })
  @Length(2, 100, { message: 'El nombre debe tener entre 2 y 100 caracteres' })
  nombre: string;

  @ApiProperty({
    example: 'Películas con escenas de combate, persecuciones y alto ritmo.',
    description: 'Descripción del género',
  })
  @IsString({ message: 'La descripción debe ser una cadena' })
  @IsNotEmpty({ message: 'La descripción no puede ir vacía' })
  descripcion: string;
}

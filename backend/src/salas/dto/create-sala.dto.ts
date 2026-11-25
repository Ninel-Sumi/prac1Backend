// src/salas/dto/create-sala.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsPositive, IsString, Length } from 'class-validator';

export class CreateSalaDto {
  @ApiProperty({ example: 'Sala 1', description: 'Nombre de la sala' })
  @IsString({ message: 'El nombre debe ser una cadena' })
  @IsNotEmpty({ message: 'El nombre no puede ir vacío' })
  @Length(2, 100, { message: 'El nombre debe tener entre 2 y 100 caracteres' })
  nombre: string;

  @ApiProperty({ example: 80, description: 'Capacidad máxima de asientos de la sala' })
  @IsInt({ message: 'La capacidad debe ser un número entero' })
  @IsPositive({ message: 'La capacidad debe ser mayor a 0' })
  capacidad: number;

  @ApiProperty({ example: '2D', enum: ['2D', '3D', 'IMAX'], description: 'Tipo de proyección de la sala' })
  @IsString({ message: 'El tipo debe ser una cadena' })
  @IsIn(['2D', '3D', 'IMAX'], { message: 'El tipo debe ser 2D, 3D o IMAX' })
  tipo: string;
}

// src/clientes/dto/create-cliente.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({ example: 'Ana María', description: 'Nombres del cliente' })
  @IsString({ message: 'Los nombres deben ser una cadena' })
  @IsNotEmpty({ message: 'Los nombres no pueden ir vacíos' })
  @Length(2, 100, { message: 'Los nombres deben tener entre 2 y 100 caracteres' })
  nombres: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido paterno del cliente' })
  @IsString({ message: 'El apellido paterno debe ser una cadena' })
  @IsNotEmpty({ message: 'El apellido paterno no puede ir vacío' })
  @Length(2, 100, { message: 'El apellido paterno debe tener entre 2 y 100 caracteres' })
  paterno: string;

  @ApiProperty({ example: 'López', description: 'Apellido materno del cliente' })
  @IsString({ message: 'El apellido materno debe ser una cadena' })
  @IsNotEmpty({ message: 'El apellido materno no puede ir vacío' })
  @Length(2, 100, { message: 'El apellido materno debe tener entre 2 y 100 caracteres' })
  materno: string;

  @ApiProperty({ example: 'ana.perez@correo.com', description: 'Correo electrónico del cliente' })
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email no puede ir vacío' })
  email: string;
}

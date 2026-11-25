// src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@cine.com', description: 'Correo electrónico registrado' })
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email no puede ir vacío' })
  email: string;

  @ApiProperty({ example: '123456', description: 'Contraseña del usuario' })
  @IsString({ message: 'La contraseña debe ser una cadena' })
  @IsNotEmpty({ message: 'La contraseña no puede ir vacía' })
  password: string;
}

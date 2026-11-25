// src/auth/dto/register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'admin_cine', description: 'Nombre de usuario del personal' })
  @IsString({ message: 'El username debe ser una cadena' })
  @IsNotEmpty({ message: 'El username no puede ir vacío' })
  @Length(3, 100, { message: 'El username debe tener entre 3 y 100 caracteres' })
  username: string;

  @ApiProperty({ example: 'admin@cine.com', description: 'Correo electrónico único' })
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email no puede ir vacío' })
  email: string;

  @ApiProperty({ example: '123456', description: 'Contraseña (mínimo 6 caracteres)' })
  @IsString({ message: 'La contraseña debe ser una cadena' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}

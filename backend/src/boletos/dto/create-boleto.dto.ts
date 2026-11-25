// src/boletos/dto/create-boleto.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateBoletoDto {
  @ApiProperty({ example: 1, description: 'ID de la función' })
  @IsInt({ message: 'idFuncion debe ser un número entero' })
  @IsPositive({ message: 'idFuncion debe ser mayor a 0' })
  idFuncion: number;

  @ApiProperty({ example: 1, description: 'ID del cliente que compra el boleto' })
  @IsInt({ message: 'idCliente debe ser un número entero' })
  @IsPositive({ message: 'idCliente debe ser mayor a 0' })
  idCliente: number;

  @ApiProperty({ example: 5, description: 'Número de asiento (entre 1 y la capacidad de la sala)' })
  @IsInt({ message: 'numeroAsiento debe ser un número entero' })
  @IsPositive({ message: 'numeroAsiento debe ser mayor a 0' })
  numeroAsiento: number;

  @ApiPropertyOptional({
    example: 45.5,
    description: 'Precio pagado (opcional; si no se envía, se usa el precio de la función)',
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'precioPagado debe ser un número válido con hasta 2 decimales' })
  @IsPositive({ message: 'precioPagado debe ser mayor a 0' })
  precioPagado?: number;
}

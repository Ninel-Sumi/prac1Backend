// src/boletos/entities/boleto.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Funcion } from '../../funciones/entities/funcion.entity.js';
import { Cliente } from '../../clientes/entities/cliente.entity.js';

@Entity('boletos')
export class Boleto {
  @PrimaryGeneratedColumn()
  idBoleto: number;

  @Column({ type: 'int', nullable: false })
  idFuncion: number;

  @Column({ type: 'int', nullable: false })
  idCliente: number;

  @Column({ type: 'int', nullable: false })
  numeroAsiento: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  precioPagado: number;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @ManyToOne(() => Funcion, (funcion) => funcion.boletos)
  @JoinColumn({ name: 'idFuncion' })
  funcion: Relation<Funcion>;

  @ManyToOne(() => Cliente, (cliente) => cliente.boletos)
  @JoinColumn({ name: 'idCliente' })
  cliente: Relation<Cliente>;
}

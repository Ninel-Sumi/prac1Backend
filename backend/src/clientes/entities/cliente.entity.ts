// src/clientes/entities/cliente.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Boleto } from '../../boletos/entities/boleto.entity.js';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  idCliente: number;

  @Column({ length: 100, nullable: false })
  nombres: string;

  @Column({ length: 100, nullable: false })
  paterno: string;

  @Column({ length: 100, nullable: false })
  materno: string;

  @Column({ length: 150, nullable: false })
  email: string;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @OneToMany(() => Boleto, (boleto) => boleto.cliente)
  boletos: Relation<Boleto[]>;
}

// src/salas/entities/sala.entity.ts
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
import { Funcion } from '../../funciones/entities/funcion.entity.js';

@Entity('salas')
export class Sala {
  @PrimaryGeneratedColumn()
  idSala: number;

  @Column({ length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'int', nullable: false })
  capacidad: number;

  @Column({ length: 20, nullable: false })
  tipo: string;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @OneToMany(() => Funcion, (funcion) => funcion.sala)
  funciones: Relation<Funcion[]>;
}

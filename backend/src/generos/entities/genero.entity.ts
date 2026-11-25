// src/generos/entities/genero.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Pelicula } from '../../peliculas/entities/pelicula.entity.js';

@Entity('generos')
export class Genero {
  @PrimaryGeneratedColumn()
  idGenero: number;

  @Column({ length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'text', nullable: false })
  descripcion: string;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @ManyToMany(() => Pelicula, (pelicula) => pelicula.generos)
  peliculas: Relation<Pelicula[]>;
}

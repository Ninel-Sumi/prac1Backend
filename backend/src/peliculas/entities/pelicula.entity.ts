// src/peliculas/entities/pelicula.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Funcion } from '../../funciones/entities/funcion.entity.js';
import { Genero } from '../../generos/entities/genero.entity.js';

@Entity('peliculas')
export class Pelicula {
  @PrimaryGeneratedColumn()
  idPelicula: number;

  @Column({ length: 150, nullable: false })
  titulo: string;

  @Column({ type: 'text', nullable: false })
  sinopsis: string;

  @Column({ type: 'int', nullable: false })
  duracionMin: number;

  @Column({ length: 10, nullable: false })
  clasificacion: string;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @OneToMany(() => Funcion, (funcion) => funcion.pelicula)
  funciones: Relation<Funcion[]>;

  @ManyToMany(() => Genero, (genero) => genero.peliculas)
  @JoinTable({
    name: 'pelicula_genero',
    joinColumn: { name: 'idPelicula', referencedColumnName: 'idPelicula' },
    inverseJoinColumn: { name: 'idGenero', referencedColumnName: 'idGenero' },
  })
  generos: Relation<Genero[]>;
}

// src/funciones/entities/funcion.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Sala } from '../../salas/entities/sala.entity.js';
import { Pelicula } from '../../peliculas/entities/pelicula.entity.js';
import { Boleto } from '../../boletos/entities/boleto.entity.js';

@Entity('funciones')
export class Funcion {
  @PrimaryGeneratedColumn()
  idFuncion: number;

  @Column({ type: 'int', nullable: false })
  idSala: number;

  @Column({ type: 'int', nullable: false })
  idPelicula: number;

  @Column({ type: 'datetime', nullable: false })
  fechaHora: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  precio: number;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @ManyToOne(() => Sala, (sala) => sala.funciones)
  @JoinColumn({ name: 'idSala' })
  sala: Relation<Sala>;

  @ManyToOne(() => Pelicula, (pelicula) => pelicula.funciones)
  @JoinColumn({ name: 'idPelicula' })
  pelicula: Relation<Pelicula>;

  @OneToMany(() => Boleto, (boleto) => boleto.funcion)
  boletos: Relation<Boleto[]>;
}

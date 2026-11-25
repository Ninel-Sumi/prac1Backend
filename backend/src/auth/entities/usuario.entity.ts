// src/auth/entities/usuario.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column({ length: 100, nullable: false })
  username: string;

  @Column({ length: 150, unique: true, nullable: false })
  email: string;

  @Column({ length: 255, nullable: false })
  password: string;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;
}

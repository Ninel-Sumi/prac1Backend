// src/auth/auth.service.ts
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepositorio: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existente = await this.usuarioRepositorio.findOneBy({
      email: registerDto.email,
    });
    if (existente) {
      throw new BadRequestException(
        `El email ${registerDto.email} ya está registrado`,
      );
    }

    const passwordEncriptada = await bcrypt.hash(registerDto.password, 10);

    const usuario = this.usuarioRepositorio.create({
      username: registerDto.username,
      email: registerDto.email,
      password: passwordEncriptada,
    });

    const guardado = await this.usuarioRepositorio.save(usuario);

    return {
      idUsuario: guardado.idUsuario,
      username: guardado.username,
      email: guardado.email,
      creadoEn: guardado.creadoEn,
    };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const usuario = await this.usuarioRepositorio.findOneBy({
      email: loginDto.email,
    });
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValida = await bcrypt.compare(
      loginDto.password,
      usuario.password,
    );
    if (!passwordValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: usuario.idUsuario,
      email: usuario.email,
      username: usuario.username,
    };

    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}

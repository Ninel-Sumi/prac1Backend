// src/auth/guards/jwt-auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extraerToken(request);

    if (!token) {
      throw new UnauthorizedException('Token no enviado o formato inválido');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      (request as Request & { usuario?: unknown }).usuario = payload;
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    return true;
  }

  private extraerToken(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;
    const [tipo, token] = authHeader.split(' ');
    return tipo === 'Bearer' ? token : undefined;
  }
}

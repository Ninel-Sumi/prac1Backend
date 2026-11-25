// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SalasModule } from './salas/salas.module.js';
import { GenerosModule } from './generos/generos.module.js';
import { PeliculasModule } from './peliculas/peliculas.module.js';
import { FuncionesModule } from './funciones/funciones.module.js';
import { ClientesModule } from './clientes/clientes.module.js';
import { BoletosModule } from './boletos/boletos.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true, // ¡Solo usar en desarrollo!
    }),
    SalasModule,
    GenerosModule,
    PeliculasModule,
    FuncionesModule,
    ClientesModule,
    BoletosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

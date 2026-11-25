# Sistema de Gestión de Cine - Backend (NestJS + TypeORM + MySQL)

API REST desarrollada con **NestJS**, **TypeORM** y **MySQL** para administrar salas, cartelera de películas, géneros, funciones programadas, clientes y venta de boletos con validación de asientos, borrado lógico (`softDelete`) y documentación interactiva con **Scalar**.

## Requisitos previos

- **Node.js** (v20 o superior)
- **MySQL / MariaDB** (por ejemplo, mediante **XAMPP**)

## Instalación y ejecución local

1. **Clonar el repositorio e ingresar a la carpeta del backend:**
   ```bash
   cd backend
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Crear la base de datos en MySQL (phpMyAdmin):**
   Crear una base de datos vacía llamada `cine_db` (con `synchronize: true`, TypeORM generará automáticamente las tablas al iniciar).

4. **Configurar las variables de entorno:**
   Copiar el archivo `.env.example` a `.env` y ajustar los valores si es necesario:
   ```env
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=
   DB_DATABASE=cine_db
   PORT=3001
   JWT_SECRET=clave_secreta_cine
   ```

5. **Iniciar el servidor en modo desarrollo:**
   ```bash
   npm run start:dev
   ```

El servidor quedará escuchando en `http://localhost:3001`.

## Documentación de la API (Scalar)

Una vez iniciado el servidor, abrir en el navegador:

- **Scalar UI:** `http://localhost:3001/docs`

## Módulos y endpoints principales

- **Auth (`/auth`):** `POST /auth/register`, `POST /auth/login` (los endpoints `GET` son públicos; `POST`, `PATCH` y `DELETE` requieren Bearer Token JWT)
- **Salas (`/salas`):** `GET`, `GET /:id`, `POST`, `PATCH /:id`, `DELETE /:id`
- **Géneros (`/generos`):** `GET`, `GET /:id`, `POST`, `PATCH /:id`, `DELETE /:id`
- **Películas (`/peliculas`):** `GET`, `GET /:id`, `POST`, `PATCH /:id`, `DELETE /:id`, `POST /:id/generos`, `DELETE /:id/generos/:idGenero`
- **Funciones (`/funciones`):** `GET`, `GET /:id`, `POST`, `PATCH /:id`, `DELETE /:id`
- **Clientes (`/clientes`):** `GET`, `GET /:id`, `POST`, `PATCH /:id`, `DELETE /:id`
- **Boletos (`/boletos`):** `GET`, `GET /:id`, `POST`, `PATCH /:id`, `DELETE /:id`

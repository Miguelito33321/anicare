# Anicare Web

Base tecnica inicial para el sitio de Anicare (guarderia, refugio y adopcion) con Next.js + Prisma.

## Requisitos
- Node.js 20+
- npm 10+
- PostgreSQL 15+

## Inicio rapido
1. Copiar entorno:
   - `cp .env.example .env`
2. Instalar dependencias:
   - `npm install`
3. Generar cliente Prisma:
   - `npm run prisma:generate`
4. Ejecutar migraciones:
   - `npm run prisma:migrate`
5. Cargar seed inicial:
   - `npm run prisma:seed`
6. Ejecutar app:
   - `npm run dev`

## Rutas principales
- `/`
- `/sobre-nosotros`
- `/servicios`
- `/adopcion`
- `/reservas`
- `/testimonios`
- `/blog`
- `/preguntas-frecuentes`
- `/contacto`
- `/admin`

## API inicial
- `POST /api/reservas/disponibilidad`
- `POST /api/reservas`
- `GET /api/adopcion/animales`
- `POST /api/adopcion/solicitudes`
- `POST /api/contacto`
- `POST /api/newsletter`

## Estado
- Scaffold base completado.
- Falta instalar dependencias y ejecutar migraciones para correr local.
- Falta conectar formularios del frontend a API (siguiente sprint tecnico).

# Microservicio de Autenticación con Redes Sociales

Este microservicio permite autenticación con Facebook e Instagram usando Node.js, TypeScript y Passport.js.

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Copiar el archivo de variables de entorno:
```bash
cp env.example .env
```

3. Configurar las credenciales en `.env`:
```env
# Facebook OAuth
FACEBOOK_CLIENT_ID=tu_facebook_client_id
FACEBOOK_CLIENT_SECRET=tu_facebook_client_secret
FACEBOOK_CALLBACK_URL=http://localhost:3000/auth/facebook/callback

# Instagram OAuth
INSTAGRAM_CLIENT_ID=tu_instagram_client_id
INSTAGRAM_CLIENT_SECRET=tu_instagram_client_secret
INSTAGRAM_CALLBACK_URL=http://localhost:3000/auth/instagram/callback

# Session
SESSION_SECRET=tu_session_secret

# Server
PORT=3000
```

## Ejecución

```bash
npx ts-node src/server.ts
```

## Endpoints

### Autenticación

- `GET /auth/facebook` - Iniciar login con Facebook
- `GET /auth/facebook/callback` - Callback de Facebook
- `GET /auth/instagram` - Iniciar login con Instagram
- `GET /auth/instagram/callback` - Callback de Instagram
- `GET /auth/logout` - Cerrar sesión
- `GET /auth/me` - Obtener usuario actual (requiere autenticación)
- `GET /auth/check` - Verificar estado de autenticación
- `GET /auth/failure` - Página de error de autenticación

## Estructura del Proyecto

```
src/
├── config/
│   └── passport.ts          # Configuración de estrategias de Passport
├── controllers/
│   └── authController.ts    # Controladores de autenticación
├── middlewares/
│   └── authMiddleware.ts    # Middlewares de autenticación
├── models/
│   └── User.ts             # Modelo de usuario
├── routes/
│   └── authRoutes.ts       # Rutas de autenticación
├── services/
│   └── userService.ts      # Servicio de usuarios
├── utils/
│   └── profileMapper.ts    # Mapeo de perfiles
├── app.ts                  # Configuración de Express
└── server.ts              # Punto de entrada
```

## Uso

### Login con Facebook
1. Navegar a `http://localhost:3000/auth/facebook`
2. Autorizar la aplicación
3. Ser redirigido a `/auth/facebook/callback` con el usuario creado/actualizado

### Login con Instagram
1. Navegar a `http://localhost:3000/auth/instagram`
2. Autorizar la aplicación
3. Ser redirigido a `/auth/instagram/callback` con el usuario creado/actualizado

### Verificar autenticación
```bash
curl http://localhost:3000/auth/check
```

### Obtener usuario actual
```bash
curl http://localhost:3000/auth/me
```

## Base de Datos

Actualmente usa un array en memoria para simular la base de datos. Para producción, reemplaza `UserService` con tu ORM preferido (Sequelize, TypeORM, Prisma, etc.).

## Personalización

- Modifica `src/models/User.ts` para agregar campos adicionales
- Actualiza `src/utils/profileMapper.ts` para mapear campos específicos
- Implementa tu lógica de base de datos en `src/services/userService.ts` 
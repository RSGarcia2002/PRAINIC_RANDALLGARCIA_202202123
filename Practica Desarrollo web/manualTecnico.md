# Manual Técnico

## Introducción
Este documento proporciona información técnica detallada sobre la arquitectura, instalación, configuración y mantenimiento del sistema.

## Arquitectura del Sistema
El sistema sigue una arquitectura basada en **Microservicios** con las siguientes tecnologías:
- **Backend:** Node.js con Express
- **Frontend:** Angular
- **Base de Datos:** MongoDB
- **Autenticación:** JWT
- **Despliegue:** Docker y Kubernetes

## Requisitos del Sistema
- **Sistema Operativo:** Windows, macOS o Linux
- **Node.js:** v18 o superior
- **MongoDB:** v6.0
- **Docker:** v24 o superior
- **RAM:** 8GB mínimo

## Instalación y Configuración
### 1. Clonar el Repositorio
```bash
git clone https://github.com/usuario/proyecto.git
cd proyecto
```

### 2. Instalación de Dependencias
```bash
npm install
```

### 3. Configuración del Entorno
Crear un archivo `.env` con los siguientes valores:
```
PORT=3000
DATABASE_URL=mongodb://localhost:27017/base_de_datos
JWT_SECRET=secreto_seguro
```

### 4. Ejecución del Backend
```bash
npm start
```

### 5. Ejecución del Frontend
```bash
cd frontend
npm install
ng serve
```

## Estructura del Proyecto
```
/proyecto
│── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   ├── server.js
│── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── environments/
│── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
```

## API Endpoints
### Autenticación
#### `POST /api/auth/login`
**Descripción:** Iniciar sesión con credenciales.
**Respuesta:**
```json
{
  "token": "JWT_TOKEN"
}
```

### Usuarios
#### `GET /api/users`
**Descripción:** Obtener la lista de usuarios.

## Despliegue con Docker
### 1. Construcción de la imagen
```bash
docker build -t nombre-imagen .
```

### 2. Ejecución del contenedor
```bash
docker run -p 3000:3000 nombre-imagen
```

### 3. Uso de Docker Compose
```bash
docker-compose up -d
```

## Mantenimiento y Solución de Problemas
| Problema | Solución |
|----------|---------|
| Error de conexión a la BD | Verifique que MongoDB esté corriendo y revise la variable `DATABASE_URL` |
| El contenedor falla al iniciar | Verifique los logs con `docker logs <container_id>` |

## Contacto
Para soporte técnico, comunicarse con: soporte@empresa.com
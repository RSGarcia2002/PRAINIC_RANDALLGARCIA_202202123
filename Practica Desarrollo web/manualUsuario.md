# Manual de Usuario

## Introducción
Bienvenido al Manual de Usuario. Este documento proporciona información detallada sobre el uso y configuración del software.

## Requisitos del Sistema
Antes de instalar y ejecutar el software, asegúrese de cumplir con los siguientes requisitos:
- **Sistema Operativo:** Windows, macOS o Linux
- **RAM:** Mínimo 4GB (8GB recomendado)
- **Espacio en disco:** Al menos 500MB de espacio libre
- **Dependencias:** Node.js (para el backend), Angular (para el frontend)

## Instalación
### 1. Clonar el Repositorio
Ejecute el siguiente comando en la terminal:
```bash
git clone https://github.com/usuario/proyecto.git
cd proyecto
```

### 2. Instalación de Dependencias
Ejecute el siguiente comando en el directorio raíz:
```bash
npm install
```

### 3. Configuración del Entorno
Cree un archivo `.env` y configure las variables necesarias:
```
PORT=3000
DATABASE_URL=mongodb://localhost:27017/base_de_datos
```

### 4. Ejecución del Servidor
Para iniciar el servidor, ejecute:
```bash
npm start
```

## Uso del Software
### Iniciar Sesión
1. Abra el navegador y diríjase a `http://localhost:3000`
2. Ingrese sus credenciales y haga clic en "Iniciar sesión"

### Funcionalidades Principales
- **Gestión de Usuarios:** Crear, editar y eliminar usuarios.
- **Dashboard:** Visualización de estadísticas en tiempo real.
- **Reportes:** Generación de informes exportables en PDF y Excel.

## Solución de Problemas
| Problema | Solución |
|----------|---------|
| Error al iniciar el servidor | Asegúrese de que MongoDB esté en ejecución y revise el archivo `.env` |
| Página en blanco | Verifique la consola del navegador para errores y asegúrese de que el frontend esté ejecutándose |

## Contacto
Para soporte técnico, comuníquese con: soporte@empresa.com

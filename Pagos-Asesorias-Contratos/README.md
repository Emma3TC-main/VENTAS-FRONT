# Real Estate System Frontend

## Project Description

Este proyecto es un sistema frontend para la gestión inmobiliaria desarrollado con Angular 15. Proporciona funcionalidades para manejar:

- **Pagos:** Listado, creación y edición de pagos asociados a contratos.
- **Auditorías:** Visualización de registros de auditoría y detalles.
- **Contratos:** Gestión de contratos con clientes y propiedades.

El sistema está modularizado en tres funcionalidades principales, cada una en su módulo Angular independiente. Utiliza Tailwind CSS para estilos modernos y responsivos.

## Features

- Routing avanzado con lazy loading para módulos.
- Formularios reactivos con validación completa.
- Tablas de datos con filtros reactivos.
- Navegación principal simple y clara.
- Preparado para integración con backend Java 21.
- Configuración de producción y desarrollo.
- Tests unitarios básicos para componentes clave.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 o superior recomendado.
- [Angular CLI](https://angular.io/cli) versión 15 compatible.
- npm (v8 o superior) incluido con Node.js.

## Installation

1. Clonar o descargar el repositorio.
2. En la carpeta raíz del proyecto ejecutar:

    npm install

3. Copiar el archivo `.env.example` a `.env` y configurar la variable:

       BACKEND_API_URL=http://localhost:8080/api

## Development Server

Ejecutar en modo desarrollo con recarga automática:

    ng serve

Abrir en el navegador en `http://localhost:4200`.

## Building for Production

Para compilar para producción optimizada:

    ng build --prod

Los archivos compilados estarán en `dist/real-estate-frontend`.

## Tailwind CSS Usage

Tailwind CSS está configurado y listo para usar. Puedes editar `tailwind.config.js` para extender estilos y colores.

Los estilos globales están en `src/styles.css`.

## Folder Structure

- `src/app/`: Código principal de la aplicación.
  - `pagos/`, `auditorias/`, `contratos/`: Módulos con componentes y rutas.
  - `shared/`: Módulo compartido para componentes y utilidades comunes.
- `src/environments/`: Configuraciones de entorno.
- `src/assets/`: Archivos estáticos.
- `src/styles.css`: Estilos globales con Tailwind.

## How to Extend Modules

Para agregar funcionalidades:

- Crear nuevos componentes dentro del módulo correspondiente.
- Añadir rutas en el archivo de routing del módulo.
- Utilizar servicios para interactuar con backend (pendiente integración).
- Agregar validaciones y pruebas unitarias.

## Troubleshooting

- **Error de versiones:** Asegúrate que Node.js y Angular CLI cumplen los requisitos.
- **Problemas con Tailwind:** Ejecuta `npm install` y verifica `postcss.config.js`.
- **Errores de compilación:** Revisa `tsconfig` y que todos los archivos estén guardados.
- **Problemas con rutas:** Verifica que el servidor dev está corriendo y las rutas son correctas.

## Contact

Para dudas o soporte, contacta a:

- Nombre: Equipo de desarrollo
- Email: soporte@inmobiliariaejemplo.com

---

¡Gracias por usar este sistema inmobiliario frontend Angular!

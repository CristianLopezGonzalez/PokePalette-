# 🎨⚡ PokéPalette

> Genera paletas de color automáticas inspiradas en tus Pokémon favoritos.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

---

## 📖 Descripción

**PokéPalette** es una aplicación web fullstack que combina el universo Pokémon con el diseño gráfico y la creatividad visual.

La plataforma permite a los usuarios explorar la paleta de colores predominantes extraída automáticamente de los sprites oficiales de cualquier Pokémon, generando combinaciones cromáticas únicas listas para usar en proyectos de diseño, ilustración o desarrollo web.

La aplicación consume la **PokéAPI** como fuente de datos externa para obtener los sprites e información de cada Pokémon, y aplica un algoritmo de extracción de color para identificar los cuatro tonos más representativos de cada imagen.

---

## ✨ Funcionalidades

### Usuarios no registrados
- 🔍 Buscar cualquier Pokémon por nombre o número
- 🎨 Ver su paleta de 4 colores generada automáticamente
- 🖼️ Explorar la galería pública de paletas
- 🔎 Filtrar por tipo, generación o color predominante

### Usuarios registrados
- ❤️ Guardar paletas favoritas
- 📁 Crear colecciones personales de paletas
- 🏷️ Etiquetar paletas por estado de ánimo o estilo
- 💬 Comentar y valorar paletas de otros usuarios

### Administrador
- 👥 Gestionar usuarios
- 🛡️ Moderar comentarios
- 📊 Ver estadísticas de uso

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | Node.js + Express |
| Base de datos | MySQL + Sequelize |
| Frontend | React + React Router |
| Estilos | Tailwind CSS |
| Autenticación | JWT + bcrypt |
| API externa | PokéAPI (axios) |
| Extracción de color | node-vibrant |
| Variables de entorno | dotenv |

---

## 📁 Estructura del proyecto

```
pokepalette/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── paletteController.js
│   │   ├── pokemonController.js
│   │   └── collectionController.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── palette.routes.js
│   │   ├── pokemon.routes.js
│   │   └── collection.routes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── admin.js
│   ├── services/
│   │   ├── colorExtractor.js
│   │   └── pokeApiService.js
│   ├── models/
│   ├── .env.example
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Explorer.jsx
│   │   │   ├── PokemonSearch.jsx
│   │   │   ├── PaletteDetail.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Admin.jsx
│   │   ├── components/
│   │   │   ├── PokemonCard.jsx
│   │   │   ├── PaletteCard.jsx
│   │   │   ├── ColorSwatch.jsx
│   │   │   └── FilterBar.jsx
│   │   └── context/
│   │       └── AuthContext.jsx
│   └── package.json
│
└── README.md
```

---

## 🚀 Instalación y uso

### Requisitos previos
- Node.js v18+
- MySQL 8+
- npm o yarn

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/pokepalette.git
cd pokepalette
```

### 2. Configurar el backend

```bash
cd backend
npm install
```

Crea un archivo `.env` basado en `.env.example`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=pokepalette
JWT_SECRET=tu_jwt_secret
```

Inicia el servidor:

```bash
npm run dev
```

### 3. Configurar el frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔌 API Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Registro de usuario |
| POST | `/api/auth/login` | Login |
| GET | `/api/pokemon/:name` | Buscar Pokémon y generar paleta |
| GET | `/api/palettes` | Obtener galería pública |
| POST | `/api/palettes` | Guardar paleta (auth) |
| GET | `/api/collections` | Colecciones del usuario (auth) |
| POST | `/api/collections` | Crear colección (auth) |

---

## 🎨 ¿Cómo funciona la extracción de color?

La app obtiene el sprite oficial del Pokémon desde la PokéAPI y lo procesa con **node-vibrant**, que analiza la imagen y devuelve los colores más representativos:

```js
const palette = await Vibrant.from(spriteUrl).getPalette()

const colors = {
  vibrant:     palette.Vibrant?.hex,
  darkVibrant: palette.DarkVibrant?.hex,
  muted:       palette.Muted?.hex,
  lightMuted:  palette.LightMuted?.hex
}
```

---

## 👤 Autor

**Tu Nombre** — Proyecto Final de Grado Superior DAW  
[GitHub](https://github.com/tu-usuario)

---

## 📝 Licencia

Este proyecto ha sido desarrollado con fines académicos.

# 🍳 CookApp Backend API

API backend de **CookApp**, una aplicación fullstack de recetas donde los usuarios pueden registrarse, iniciar sesión, crear recetas, gestionar favoritos y editar su propio contenido.

---

# 🚀 Despliegue

* Backend: https://cookapp-backend-6lg0.onrender.com
* Frontend: https://lustrous-choux-3c11f9.netlify.app/
* Repositorio Frontend: https://github.com/asolermaria/CookApp-Frontend.git

---

# ✨ Funcionalidades

* 🔐 Autenticación JWT con cookies HTTP-only
* 👤 Registro e inicio de sesión de usuarios
* 🛡️ Rutas protegidas mediante middleware de autenticación
* 🍝 Crear, editar y eliminar recetas
* ❤️ Sistema de recetas favoritas
* 🔎 Filtrado de recetas por título y dificultad
* 🍃 Integración con MongoDB
* 📄 Documentación Swagger/OpenAPI
* 🪖 Middleware de seguridad Helmet
* 🌐 Configuración CORS para integración con frontend

---

# 🛠️ Tecnologías utilizadas

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Cookie Parser
* Helmet
* Morgan
* Swagger UI

---

# 📁 Estructura del proyecto

```bash
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
└── app.js
```

---

# ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=
MY_MONGO_URI=
ACCESS_TOKEN_SECRET=
FRONTEND_URL=
```

---

# 📦 Instalación

## Clonar repositorio

```bash
git clone https://github.com/asolermaria/CookApp-Backend.git
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar servidor

```bash
npm start
```

---

# 📚 Endpoints principales

## 🔐 Autenticación

| Método | Endpoint              | Descripción                 |
| ------ | --------------------- | --------------------------- |
| POST   | /api/auth/register    | Registrar usuario           |
| POST   | /api/auth/login       | Iniciar sesión              |
| POST   | /api/auth/logout      | Cerrar sesión               |
| GET    | /api/auth/active-user | Obtener usuario autenticado |

---

## 🍳 Recetas

| Método | Endpoint               | Descripción                 |
| ------ | ---------------------- | --------------------------- |
| GET    | /api/recipes           | Obtener recetas             |
| GET    | /api/recipes/:id       | Obtener receta por ID       |
| GET    | /api/recipes/myrecipes | Obtener recetas del usuario |
| POST   | /api/recipes           | Crear receta                |
| PUT    | /api/recipes/:id       | Editar receta               |
| DELETE | /api/recipes/:id       | Eliminar receta             |

---

## ❤️ Favoritos

| Método | Endpoint                 | Descripción       |
| ------ | ------------------------ | ----------------- |
| GET    | /api/favorites           | Obtener favoritos |
| POST   | /api/favorites/:recipeId | Añadir favorito   |
| DELETE | /api/favorites/:recipeId | Eliminar favorito |

---

# 📖 Documentación Swagger

La documentación de la API está disponible en:

```txt
/api-docs
```

---

# 🔒 Seguridad

El backend incluye:

* 🔐 Autenticación JWT
* 🍪 Cookies HTTP-only
* 🪖 Headers de seguridad con Helmet
* 🔑 Hash de contraseñas con bcrypt
* 🛡️ Middleware de rutas protegidas
* 🌐 Configuración CORS

---

# 👩‍💻 Autor

Desarrollado por Antonio Soler Maria.

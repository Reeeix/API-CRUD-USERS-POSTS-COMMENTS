# 📝 API REST – Blog App

Este proyecto consiste en una **API REST** desarrollada con **Node.js**, **Express** y **MongoDB**, para la gestión de usuarios, posts y comentarios, incluyendo autenticación y autorización mediante **JWT** y roles (`user` / `admin`).

Permite:

- Gestionar usuarios
- Gestionar posts
- Gestionar comentarios
- Control de acceso basado en roles y propiedad de los recursos

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Dotenv
- Bcrypt (para encriptación de contraseñas)
- JSON Web Token (JWT) para autenticación
- Insomnia (para probar los endpoints)
- Nodemon (para desarrollo en caliente)

---

## 🗂️ Arquitectura del proyecto

```
src/
 └── api/
     ├── models/
     │   ├── user.js
     │   ├── post.js
     │   └── comment.js
     ├── controllers/
     │   ├── user.js
     │   ├── post.js
     │   └── comment.js
     ├── routes/
     │   ├── user.js
     │   ├── post.js
     │   └── comment.js
 ├── middlewares/
 │   ├── isAuth.js
 │   ├── onlyAdmin.js
 │   ├── onlyUser.js
 │   └── isOwnerOrAdmin.js
 ├── config/
 │   └── db.js
 └── utils/
     └── seeds/
         └── user.js
index.js
.env
```

---

## 🧩 Modelos y relaciones

### 👤 Usuario (user)

- `email` (String, requerido, único)
- `password` (String, requerido)
- `role` (String, requerido)
- `timestamps` activados

### 📝 Post (post)

- `text` (String, requerido)
- `author` (ObjectId → referencia a `user`)
- `timestamps` activados

### 💬 Comentario (comment)

- `content` (String, requerido)
- `author` (ObjectId → referencia a `user`)
- `post` (ObjectId → referencia a `post`)
- `timestamps` activados

---

## 🌱 Seed de datos

Se ha creado una semilla de **usuarios** para inicializar la base de datos con datos de prueba usando `create` de Mongoose.

- Incluye usuarios con rol `user` y `admin` para probar todos los endpoints.
- Es idempotente para esos usuarios de prueba: antes de insertar, elimina solo los emails definidos en la seed.

---

## 🔗 Endpoints disponibles

### Usuarios

| Método | Endpoint      | Descripción                         | Autenticación / Rol           |
| ------ | ------------- | ----------------------------------- | ----------------------------- |
| POST   | /users/login  | Iniciar sesión                      | ✖ (Público)                   |
| GET    | /users        | Obtener todos los usuarios           | ✔ (Cualquier usuario logueado) |
| POST   | /users/register | Crear un nuevo usuario             | ✖ (Público)                   |
| PUT    | /users/:id    | Actualizar un usuario                | ✔ (Solo admin)               |
| DELETE | /users/:id    | Eliminar un usuario                  | ✔ (Propietario o admin)      |

### Posts

| Método | Endpoint      | Descripción                         | Autenticación / Rol           |
| ------ | ------------- | ----------------------------------- | ----------------------------- |
| GET    | /posts        | Obtener todos los posts              | ✔ |
| GET    | /posts/:id    | Obtener un post por id               | ✔ |
| POST   | /posts        | Crear un nuevo post                  | ✔ |
| PUT    | /posts/:id    | Actualizar post                      | ✔ (Propietario o admin)      |
| DELETE | /posts/:id    | Eliminar post                        | ✔ (Propietario o admin)      |

### Comentarios

| Método | Endpoint        | Descripción                         | Autenticación / Rol           |
| ------ | --------------- | ----------------------------------- | ----------------------------- |
| GET    | /comments       | Obtener todos los comentarios        | ✔ |
| GET    | /comments/:id   | Obtener un comentario por id         | ✔ |
| POST   | /comments       | Crear un nuevo comentario            | ✔ |
| PUT    | /comments/:id   | Actualizar comentario                | ✔ (Propietario o admin)      |
| DELETE | /comments/:id   | Eliminar comentario                  | ✔ (Propietario o admin)      |

---

## 🛡 Sistema de autenticación y autorización

- **JWT (`isAuth`)**: Protege las rutas privadas, valida el token y añade el usuario logueado a `req.user`.
- **`isOwnerOrAdmin`**: Permite modificar un recurso solo si:
  - El usuario es el propietario del recurso
  - O tiene rol `admin`
- **`onlyAdmin`**: Permite acceso solo a administradores.

### ✅ Seguridad aplicada

- El campo `password` no se devuelve en `login` ni en `getUsers`.
- En creación de usuarios, el `role` se fuerza por defecto a `user`.
- En creación de posts/comentarios, el `author` se toma de `req.user._id` para evitar suplantación.
- En comentarios, se valida que el `post` exista antes de guardar.

---

## 🧪 Pruebas

Todos los endpoints se probaron correctamente con **Insomnia**, incluyendo:

- CRUD completo de usuarios, posts y comentarios
- Manejo de errores
- Validación de roles y propiedad de recursos
- Autenticación con JWT

---

## ▶️ Ejecución del proyecto

1. Instalar dependencias:

```sh
npm install
```

2. Configurar `.env`:

```env
PORT=3000
MONGO_URI=tu_uri_de_mongodb
JWT_SECRET=clave_secreta
```

3. Correr el servidor:

```sh
npm run dev
```

4. Cargar datos de prueba (opcional):

```sh
node src/utils/seeds/user.js
```

---

## ⚡ Mejoras futuras

Si esta API fuera una aplicación real, se podrían implementar las siguientes mejoras para aumentar la seguridad y la funcionalidad.

1. **Control de comentarios por el autor del post**
   - Permitir que el autor de un post pueda eliminar los comentarios hechos en su post, además del autor del comentario y los admin.

2. **Filtrado por usuario**
   - Añadir endpoints para obtener todos los posts o comentarios creados por un usuario concreto, permitiendo consultar la actividad de cada usuario.

3. **Mayor control de permisos**
   - Posibilidad de crear reglas más finas de autorización, como que solo el autor o los administradores puedan editar ciertos recursos, o incluso permisos por tipo de contenido.



## 🏁 Conclusión

Este proyecto demuestra:

- Creación de una **API REST** con Node.js y Express
- Gestión de modelos y relaciones con Mongoose
- Control de roles y permisos
- Manejo de autenticación con JWT
- Buenas prácticas en organización de proyecto y modularización de código



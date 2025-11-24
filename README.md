#  MercApp

Aplicación web tipo SPA para gestión de catálogo de productos, búsqueda avanzada, carrito de compras y CRUD completo.
Desarrollada con **Vue 3, Vite, Node.js, Express y MongoDB**.

---

## Datos del estudiante

- **Nombre:** Anderson Vicente Ramos Iza  
- **Carrera:** Ingenieria en Software
- **Materia:** Aplicaciones Web  
- **Docente:** Ing. Jose Jaime  
- **Fecha:** 23/11/2025

---

## Tecnologías principales

### Frontend
- Vue 3 (Composition API)
- Vite
- Vue Router
- Fetch API (consumo del backend)
- LocalStorage (persistencia de carrito)
- CSS puro + responsive design
- Componentes SFC (Single File Components)
### Backend
- Node.js + Express
- MongoDB + Mongoose
- Express-Validator (validación de datos)
- CORS + dotenv
- Scripts de semilla (seed.js)

---

## Funcionalidades implementadas

### Catálogo de productos (Frontend)
- Listado general de productos consumiendo API REST.
- Búsqueda reactiva por nombre y descripción.
- Filtro por categorías.
- ProductCard reutilizable.
- Rutas dinámicas → **/product/:id**.
- Vista de detalle con agregar a carrito.
- Formularios para crear y editar productos.

### Carrito de compras
- Agregar y quitar productos.
- Cantidades administradas por producto.
- Total calculado con propiedades computadas.
- Persistencia automática con **localStorage**.

### Lazy Loading de vistas
- Las rutas **/about** y **/cart** se cargan perezosamente (dynamic import).
- **<Suspense>** incluido con fallback visual.

### API REST (BACKEND)
Endpoints para productos y categorías:
- Crear, listar, actualizar y eliminar productos.
- Validación de campos obligatorios.
- Manejo de errores (400, 404 y 500).
- Relaciones categoría → producto.

### Semilla de datos (Seed)
- Inserta 5 categorías y 8–12 productos.
- Ejecutable desde consola.
- Limpia colecciones anteriores.

### Manejo de errores y rutas
- Ruta 404 personalizada en la SPA.
- Manejo de excepciones en API.

### Interfaz responsive
- Compatible con dispositivo móvil, tablet y escritorio.
- Grid dinámico para productos.
---

## Instrucciones de instalación y uso

### 1️. Clonar el repositorio
```bash
git clone https://github.com/AndersonRamosUPS/MercApp
cd MercApp
```
### Backend
### 2️ Instalar dependencias
```bash
cd backend
npm install
```

### 3 Configurar el archivo .env
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/mercapp

```

### 4 Ejecutar la semilla
```bash
node seed/seed.js

```

### 5 Ejecutar el servidor backend
```bash
npm start
```
### Backend
### 6 Instalar dependencias del frontend
```bash
cd frontend
npm install
```

### 7 Ejecutar la aplicación frontend
```bash
npm run dev
```

Luego abrir en el navegador:

http://localhost:5173


---
## Rutas principales
### Fronted
| Ruta                    | Descripción                          |
| ----------------------- | ------------------------------------ |
| `/`                     | Catálogo de productos                |
| `/product/:id`          | Detalle de producto                  |
| `/product/new`          | Crear producto                       |
| `/product/:id/edit`     | Editar producto existente            |
| `/cart`                 | Carrito (lazy load)                  |
| `/about`                | Acerca de la aplicación (lazy load)  |
| `/*`                    | Página 404 personalizada             |

### Backend (API REST)
| Ruta                    |Metodo  | Descripción        |
| ----------------------- | -----  |------------------- |
| `/api/products`         |  GET   | Listar productos   |
| `/api/products/:id`     |  GET   | Obtener producto   |
| `/api/products`         |  POST  | Crear producto     |
| `/api/products/:id`     |  PUT   | Editar producto    |
| `/api/products/:id`     |  DELETE| Eliminar producto  |
| `/api/categories`       |  GET   | Listar categorías  |


---
### Estructura del proyecto
```
MercApp/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── ProductCard.vue
│   │   ├── composables/
│   │   │   ├── useApi.ts
│   │   │   ├── useProducts.ts
│   │   │   ├── useProductDetail.ts
│   │   │   ├── useCategories.ts
│   │   │   └── useCart.ts
│   │   ├── router/
│   │   │   └── index.ts
│   │   ├── views/
│   │   │   ├── HomeView.vue
│   │   │   ├── ProductDetailView.vue
│   │   │   ├── ProductFormView.vue
│   │   │   ├── CartView.vue
│   │   │   ├── AboutView.vue
│   │   │   └── NotFoundView.vue
│   │   └── App.vue
│   └── package.json
│
├── backend/
|   ├── src/
|    │   ├── config/
|    │   │   └── db.js
|    │   ├── controllers/
|    │   │   ├── products.controller.js
|    │   │   └── categories.controller.js
|    │   ├── models/
|    │   │   ├── Producto.js
|    │   │   └── Categoria.js
|    │   ├── routes/
|    │   │   ├── products.routes.js
|    │   │   └── categories.routes.js
|    │   └── middlewares/
|    │       └── validations.js
|    ├── seed/
|    │   └── seed.js
|    ├── .env
|    ├── package.json
|    └── index.js
├── README.md
├── readme.txt
```

##  Créditos
Proyecto desarrollado por Anderson Vicente Ramos Iza.
Materia: Aplicaciones Web.
Docente: Ing. Jose Jaime.
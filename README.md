# 📚 API REST - Biblioteca UGB

API REST simple para gestionar una biblioteca de libros, construida con **TypeScript** y **Express**.

---

## 🚀 Iniciar el Servidor

```bash
# Modo desarrollo (con auto-reload)
pnpm dev

# Modo producción
pnpm start
```

El servidor estará disponible en: `http://localhost:3000`

---

## 📋 Endpoints Disponibles

### 1. Listar Todos los Libros
**GET** `/libros`

Obtiene la lista completa de libros.

**Ejemplo:**
```
curl http://localhost:3000/libros
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Cien años de soledad",
    "year_of_publication": 1967,
    "author": "Gabriel García Márquez"
  },
  {
    "id": 2,
    "name": "1984",
    "year_of_publication": 1949,
    "author": "George Orwell"
  }
]
```

---

### 2. Buscar Libros por Nombre
**GET** `/libros/buscar?name=texto`

Busca libros que contengan el texto especificado en su nombre (búsqueda insensible a mayúsculas/minúsculas).

**Parámetros de consulta (query):**
- `name` (string, obligatorio): Texto a buscar en el nombre del libro

**Ejemplo:**
```bash
curl http://localhost:3000/libros/buscar?name=gatsby
```

**Respuesta exitosa (200):**
```json
[
  {
    "id": 4,
    "name": "El Gran Gatsby",
    "year_of_publication": 1925,
    "author": "F. Scott Fitzgerald"
  }
]
```

**Respuesta error (400) - Sin parámetro:**
```json
{
  "mensaje": "Debe proporcionar un parámetro 'name' para la búsqueda."
}
```

**Respuesta error (404) - Sin resultados:**
```json
{
  "mensaje": "No se encontraron libros que contengan: 'xyz'"
}
```

---

### 3. Obtener un Libro por ID
**GET** `/libros/:id`

Obtiene los detalles de un libro específico por su ID.

**Ejemplo:**
```
curl http://localhost:3000/libros/1
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "name": "Cien años de soledad",
  "year_of_publication": 1967,
  "author": "Gabriel García Márquez"
}
```

**Respuesta error (404):**
```json
{
  "mensaje": "Libro con el ID 99 no encontrado."
}
```

---

### 4. Crear un Nuevo Libro
**POST** `/libros`

Crea un nuevo libro en la biblioteca.

**Headers requeridos:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "string",
  "year_of_publication": number,
  "author": "string"
}
```

> **Nota:** El campo `author` es opcional. Si no se proporciona, se asignará "Desconocido".

**Ejemplo con curl:**
```bash
curl -X POST http://localhost:3000/libros \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Don Quijote de la Mancha",
    "year_of_publication": 1605,
    "author": "Miguel de Cervantes"
  }'
```

**Respuesta exitosa (201):**
```json
{
  "id": 5,
  "name": "Don Quijote de la Mancha",
  "year_of_publication": 1605,
  "author": "Miguel de Cervantes"
}
```

**Respuesta error (400):**
```json
{
  "mensaje": "Datos invalidos o faltantes. Se requiere 'name' (string) y 'year_of_publication' (number)."
}
```

---

## 🛠️ Tecnologías

- **Node.js** + **TypeScript**
- **Express** 5.x
- **ESM** (Módulos ES6)

---

## 📦 Estructura del Proyecto

```
biblioteca-ugb/
├── src/
│   ├── server.ts          # Servidor principal y rutas
│   └── libros.model.ts    # Interface del modelo Libro
├── package.json
├── tsconfig.json
└── README.md
```

---

## ✅ Validaciones

- El campo `name` debe ser un **string** (obligatorio)
- El campo `year_of_publication` debe ser un **number** (obligatorio)
- El campo `author` es **opcional** (por defecto: "Desconocido")
- Los IDs se autogeneran automáticamente

---

## 📝 Notas

- Los datos se almacenan **en memoria** (se pierden al reiniciar el servidor)
- Los IDs son autoincrementables comenzando desde 5
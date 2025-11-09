import express, { type Request, type Response } from 'express';
import type { Libro } from './libros.model.js';

const app = express();
const PORT = 3000;

// Cuerpo del JSON
app.use(express.json());

// Datos en memoria tipados
let libros: Libro[] = [
    { id: 1, name: "Cien años de soledad", year_of_publication: 1967, author: "Gabriel García Márquez" },
    { id: 2, name: "1984", year_of_publication: 1949, author: "George Orwell" },
    { id: 3, name: "Un Mundo Feliz", year_of_publication: 1932, author: "Aldous Huxley" },
    { id: 4, name: "El Gran Gatsby", year_of_publication: 1925, author: "F. Scott Fitzgerald" }
];
// Contador de libro que al ingresar el sieguiente libro con el cliente este sea 5 y se vaya actualizando
let nextId: number = 5;

// Los EndPoint a utilizar

// GET Listar todos los libros
app.get('/libros', (_req: Request, res: Response): void => {
    res.json(libros);
});

// GET Buscar libros por nombre (query parameter)
// IMPORTANTE: Esta ruta debe ir ANTES de /libros/:id
app.get('/libros/buscar', (req: Request, res: Response): void => {
    const name: string | undefined = req.query['name'] as string;

    if (!name) {
        res.status(400).json({ mensaje: "Debe proporcionar un parámetro 'name' para la búsqueda." });
        return;
    }

    const terminoBusqueda = name.toLowerCase();
    const resultados: Libro[] = libros.filter(libro =>
        libro.name.toLowerCase().includes(terminoBusqueda)
    );

    if (resultados.length > 0) {
        res.json(resultados);
    } else {
        res.status(404).json({ mensaje: `No se encontraron libros que contengan: '${name}'` });
    }
});

// GET para busqueda de libros almacenados

// Llamar con numero ID
app.get('/libros/:id', (req: Request, res: Response): void => {
    const id: number = parseInt(req.params['id'] ?? '');

    if (isNaN(id)) {
        res.status(400).json({ mensaje: "El ID debe ser un número." });
        return;
    }

    const libro: Libro | undefined = libros.find(b => b.id === id);

    if (libro) {
        res.json(libro);
    } else {
        // Manejo de Error
        res.status(404).json({ mensaje: `Libro con el ID ${id} no encontrado.` });
    }
});

// Agregar libros
app.post('/libros', (req: Request, res: Response): void => {
    // desestructurar datos y validar tipos
    const { name, year_of_publication, author } = req.body;

    // Validacion de datos y tipos
    if (!name || typeof name !== 'string' || !year_of_publication || typeof year_of_publication !== 'number') {
        //manejo de error
        res.status(400).json({ mensaje: "Datos invalidos o faltantes. Se requiere 'name' (string) y 'year_of_publication' (number)." });
        return;
    }
    // agregamos el nuevo libro y en el id susmamos 1 mas para el sigueinte libro
    // en el JSON que vamos a recibir aqui decimos que el ID es autoincrementar y que no necesimatos mandar el JSON
    const nuevoLibro: Libro = {
        id: nextId++,
        name: name,
        year_of_publication: year_of_publication,
        author: author && typeof author === 'string' ? author : 'Desconocido'
    };
    //Usando el metodo push enpujamos el libro al middelware
    libros.push(nuevoLibro);
    //mostramos un mensaje 201 que fue creado exitosamente con la informacion del libro
    res.status(201).json(nuevoLibro);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor TypeScript + Express ejecutandose en http://localhost:${PORT}`);
});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Servir archivos estáticos (como index.html)
app.use(express.static(path.join(__dirname)));

// Ruta para agregar un nuevo item
app.post('/api/items', (req, res) => {
    const nuevoItem = req.body;
    const items = leerDatos();
    items.push(nuevoItem);
    escribirDatos(items);
    res.status(201).send(nuevoItem);
});

// Ruta para obtener todos los items
app.get('/api/items', (req, res) => {
    const items = leerDatos();
    res.send(items);
});

// Función para leer datos del archivo
const leerDatos = () => {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

// Función para escribir datos en el archivo
const escribirDatos = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

const dataFilePath = path.join(__dirname, 'data.json');


app.delete('/api/items', (req, res) => {
    escribirDatos([]); // Escribir un array vacío
    res.status(204).send(); // No content
});

// Inicializa el servidor
app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});


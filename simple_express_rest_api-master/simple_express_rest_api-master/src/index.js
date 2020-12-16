require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');

const { insertUser, updateUser, getAllUsers, getUser, deleteUser } = require('./db/controller/dbController');

var app = express();

var port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * GET --> Obtener data
 * POST --> Obtener data pasando atributos sensibles
 * PUT --> Insertar datos
 * DELETE --> Borrar datos
 * PATCH --> Actualizar datos...
 */

app.get('/', function (req, res) {
    res.send('HELLO WORLD');
});

app.put('/insert-user', async (req, res) => {
    const response = await insertUser(req.body.name, req.body.email, req.body.country);
    res.json(response);
});

app.patch('/update-user', async (req, res) => {
    const response = await updateUser(req.body.name, req.body.email, req.body.country);
    res.json(response);
});

app.get('/users', async (req, res) => {
    const response = await getAllUsers();
    res.json(response);
});

app.get('/users/:email', async (req, res) => {
    const response = await getUser(req.params.email);
    res.json(response);
});

app.delete('/users/:email', async (req, res) => {
    const response = await deleteUser(req.params.email);
    res.json(response);
});

app.listen(port, function () {
    console.log('Escuchando en el puerto ' + port);
});
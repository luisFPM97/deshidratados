const { Router } = require('express');
const {
    getAllEmbalajes,
    getEmbalajeById,
    createEmbalaje,
    updateEmbalaje,
    deleteEmbalaje
} = require('../controllers/embalaje.controller');

const routerEmbalaje = Router();

// Obtener todos los embalajes
routerEmbalaje.get('/embalajes', getAllEmbalajes);

// Obtener un embalaje por ID
routerEmbalaje.get('/embalajes/:id', getEmbalajeById);

// Crear un nuevo embalaje
routerEmbalaje.post('/embalajes', createEmbalaje);

// Actualizar un embalaje
routerEmbalaje.put('/embalajes/:id', updateEmbalaje);

// Eliminar un embalaje
routerEmbalaje.delete('/embalajes/:id', deleteEmbalaje);

module.exports = routerEmbalaje; 
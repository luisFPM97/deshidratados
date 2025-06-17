const { Router } = require('express');
const {
    getAllEmbarques,
    getEmbarqueById,
    createEmbarque,
    updateEmbarque,
    deleteEmbarque
} = require('../controllers/embarque.controller');

const routerEmbarque = Router();

// Obtener todos los embarques
routerEmbarque.get('/embarques', getAllEmbarques);

// Obtener un embarque por ID
routerEmbarque.get('/embarques/:id', getEmbarqueById);

// Crear un nuevo embarque
routerEmbarque.post('/embarques', createEmbarque);

// Actualizar un embarque
routerEmbarque.put('/embarques/:id', updateEmbarque);

// Eliminar un embarque
routerEmbarque.delete('/embarques/:id', deleteEmbarque);

module.exports = routerEmbarque; 
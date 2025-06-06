const { Router } = require('express');
const {
    getAllLotes,
    getLoteById,
    createLote,
    updateLote,
    deleteLote
} = require('../controllers/lote.controller');
const routerLote = Router();

// Obtener todos los lotes
routerLote.get('/lotes', getAllLotes);

// Obtener un lote por ID
routerLote.get('/lotes/:id', getLoteById);

// Crear un nuevo lote
routerLote.post('/lotes', createLote);

// Actualizar un lote
routerLote.put('/lotes/:id', updateLote);

// Eliminar un lote
routerLote.delete('/lotes/:id', deleteLote);

module.exports = routerLote; 
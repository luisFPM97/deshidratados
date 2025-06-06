const { Router } = require('express');
const {
    getAllFrutas,
    getFrutaById,
    createFruta,
    updateFruta,
    deleteFruta
} = require('../controllers/fruta.controller');

const routerFruta = Router();

// Obtener todas las frutas
routerFruta.get('/frutas', getAllFrutas);

// Obtener una fruta por ID
routerFruta.get('/frutas/:id', getFrutaById);

// Crear una nueva fruta
routerFruta.post('/frutas', createFruta);

// Actualizar una fruta
routerFruta.put('/frutas/:id', updateFruta);

// Eliminar una fruta
routerFruta.delete('/frutas/:id', deleteFruta);

module.exports = routerFruta; 
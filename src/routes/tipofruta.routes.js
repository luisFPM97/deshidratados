const { Router } = require('express');
const {
    getAllTipofrutas,
    getTipofrutaById,
    createTipofruta,
    updateTipofruta,
    deleteTipofruta
} = require('../controllers/tipofruta.controller');
const routerTipofruta = Router();

// Obtener todos los tipos de fruta
routerTipofruta.get('/tipofrutas', getAllTipofrutas);

// Obtener un tipo de fruta por ID
routerTipofruta.get('/tipofrutas/:id', getTipofrutaById);

// Crear un nuevo tipo de fruta
routerTipofruta.post('/tipofrutas', createTipofruta);

// Actualizar un tipo de fruta
routerTipofruta.put('/tipofrutas/:id', updateTipofruta);

// Eliminar un tipo de fruta
routerTipofruta.delete('/tipofrutas/:id', deleteTipofruta);

module.exports = routerTipofruta; 
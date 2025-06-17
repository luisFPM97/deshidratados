const { Router } = require('express');
const {
    getAllTipoPresentaciones,
    getTipoPresentacionById,
    createTipoPresentacion,
    updateTipoPresentacion,
    deleteTipoPresentacion
} = require('../controllers/tipopresentacion.controller');

const routerTipoPresentacion = Router();

// Obtener todos los tipos de presentación
routerTipoPresentacion.get('/tipopresentaciones', getAllTipoPresentaciones);

// Obtener un tipo de presentación por ID
routerTipoPresentacion.get('/tipopresentaciones/:id', getTipoPresentacionById);

// Crear un nuevo tipo de presentación
routerTipoPresentacion.post('/tipopresentaciones', createTipoPresentacion);

// Actualizar un tipo de presentación
routerTipoPresentacion.put('/tipopresentaciones/:id', updateTipoPresentacion);

// Eliminar un tipo de presentación
routerTipoPresentacion.delete('/tipopresentaciones/:id', deleteTipoPresentacion);

module.exports = routerTipoPresentacion; 
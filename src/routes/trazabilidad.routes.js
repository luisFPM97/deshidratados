const { Router } = require('express');
const {
    getAllTrazabilidades,
    getTrazabilidadById,
    createTrazabilidad,
    updateTrazabilidad,
    deleteTrazabilidad
} = require('../controllers/trazabilidad.controller');

const routerTrazabilidad = Router();

// Obtener todos los números de trazabilidad
routerTrazabilidad.get('/trazabilidades', getAllTrazabilidades);

// Obtener un número de trazabilidad por ID
routerTrazabilidad.get('/trazabilidades/:id', getTrazabilidadById);

// Crear un nuevo número de trazabilidad
routerTrazabilidad.post('/trazabilidades', createTrazabilidad);

// Actualizar un número de trazabilidad
routerTrazabilidad.put('/trazabilidades/:id', updateTrazabilidad);

// Eliminar un número de trazabilidad
routerTrazabilidad.delete('/trazabilidades/:id', deleteTrazabilidad);

module.exports = routerTrazabilidad; 
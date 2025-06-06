const { Router } = require('express');
const { 
    getAllRemisiones,
    getRemisionById,
    createRemision,
    updateRemision,
    deleteRemision
} = require('../controllers/remision.controller');

const routerRemision = Router();

// Obtener todas las remisiones
routerRemision.get('/remisiones', getAllRemisiones);

// Obtener una remisión por ID
routerRemision.get('/remisiones/:id', getRemisionById);

// Crear una nueva remisión
routerRemision.post('/remisiones', createRemision);

// Actualizar una remisión
routerRemision.put('/remisiones/:id', updateRemision);

// Eliminar una remisión
routerRemision.delete('/remisiones/:id', deleteRemision);

module.exports = routerRemision; 
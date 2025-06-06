const { Router } = require('express');
const {
    getAllFincas,
    getFincaById,
    createFinca,
    updateFinca,
    deleteFinca
} = require('../controllers/finca.controller');
const routerFinca = Router();

// Obtener todas las fincas
routerFinca.get('/fincas', getAllFincas);

// Obtener una finca por ID
routerFinca.get('/fincas/:id', getFincaById);

// Crear una nueva finca
routerFinca.post('/fincas', createFinca);

// Actualizar una finca
routerFinca.put('/fincas/:id', updateFinca);

// Eliminar una finca
routerFinca.delete('/fincas/:id', deleteFinca);

module.exports = routerFinca; 
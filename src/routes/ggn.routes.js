const { Router } = require('express');
const {
    getAllGGNs,
    getGGNById,
    createGGN,
    updateGGN,
    deleteGGN
} = require('../controllers/ggn.controller');
const routerGGN = Router();

// Obtener todos los certificados
routerGGN.get('/ggns', getAllGGNs);

// Obtener un certificado por ID
routerGGN.get('/ggns/:id', getGGNById);

// Crear un nuevo certificado
routerGGN.post('/ggns', createGGN);

// Actualizar un certificado
routerGGN.put('/ggns/:id', updateGGN);

// Eliminar un certificado
routerGGN.delete('/ggns/:id', deleteGGN);

module.exports = routerGGN; 
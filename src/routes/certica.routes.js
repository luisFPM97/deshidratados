const { Router } = require('express');
const {
    getAllCerticas,
    getCerticaById,
    createCertica,
    updateCertica,
    deleteCertica
} = require('../controllers/certica.controller');
const routerCertica = Router();

// Obtener todos los certificados
routerCertica.get('/certicas', getAllCerticas);

// Obtener un certificado por ID
routerCertica.get('/certicas/:id', getCerticaById);

// Crear un nuevo certificado
routerCertica.post('/certicas', createCertica);

// Actualizar un certificado
routerCertica.put('/certicas/:id', updateCertica);

// Eliminar un certificado
routerCertica.delete('/certicas/:id', deleteCertica);

module.exports = routerCertica; 
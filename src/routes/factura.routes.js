const { Router } = require('express');
const {
    getAllFacturas,
    getFacturaById,
    createFactura,
    updateFactura,
    deleteFactura
} = require('../controllers/factura.controller');
const routerFactura = Router();

// Obtener todos los certificados
routerFactura.get('/facturas', getAllFacturas);

// Obtener un certificado por ID
routerFactura.get('/facturas/:id', getFacturaById);

// Crear un nuevo certificado
routerFactura.post('/facturas', createFactura);

// Actualizar un certificado
routerFactura.put('/facturas/:id', updateFactura);

// Eliminar una factura
routerFactura.delete('/facturas/:id', deleteFactura);

module.exports = routerFactura; 
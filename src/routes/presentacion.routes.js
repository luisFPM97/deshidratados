const { Router } = require('express');
const {
    getAllPresentaciones,
    getPresentacionById,
    createPresentacion,
    updatePresentacion,
    deletePresentacion
} = require('../controllers/presentacion.controller');

const router = Router();

// Obtener todas las presentaciones
router.get('/presentaciones', getAllPresentaciones);

// Obtener una presentación por ID
router.get('/presentaciones/:id', getPresentacionById);

// Crear una nueva presentación
router.post('/presentaciones', createPresentacion);

// Actualizar una presentación
router.put('/presentaciones/:id', updatePresentacion);

// Eliminar una presentación
router.delete('/presentaciones/:id', deletePresentacion);

module.exports = router; 
const { Router } = require('express');
const {
    getAllSelecciones,
    getSeleccionById,
    createSeleccion,
    updateSeleccion,
    deleteSeleccion
} = require('../controllers/seleccion.controller');

const routerSeleccion = Router();

//Obtener todas las selecciones
router.get('/selecciones', getAllSelecciones);

//Obtener una selección por ID
router.get('/selecciones/:id', getSeleccionById);

//Crear una selección
router.post('/selecciones', createSeleccion);

//Actualizar una selección
router.put('/selecciones/:id', updateSeleccion);

//Eliminar una selección
router.delete('/selecciones/:id', deleteSeleccion);

module.exports = routerSeleccion;
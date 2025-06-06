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
routerSeleccion.get('/selecciones', getAllSelecciones);

//Obtener una selección por ID
routerSeleccion.get('/selecciones/:id', getSeleccionById);

//Crear una selección
routerSeleccion.post('/selecciones', createSeleccion);

//Actualizar una selección
routerSeleccion.put('/selecciones/:id', updateSeleccion);

//Eliminar una selección
routerSeleccion.delete('/selecciones/:id', deleteSeleccion);

module.exports = routerSeleccion;
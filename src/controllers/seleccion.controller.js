const Seleccion = require('../models/Seleccion');
const Remision = require('../models/Remision');
const SeleccionRelaciones = require('../models/SeleccionRelaciones');

// Obtener todas las selecciones
const getAllSelecciones = async (req, res) => {
    try {
        const selecciones = await Seleccion.findAll({
            include: [
                {
                    model: SeleccionRelaciones,
                    include: [
                        { model: Remision }
                    ]
                }
            ]
        });
        res.json(selecciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una selección por ID
const getSeleccionById = async (req, res) => {
    try {
        const seleccion = await Seleccion.findByPk(req.params.id, {
            include: [
                {
                    model: SeleccionRelaciones,
                    include: [
                        { model: Remision }
                    ]
                }
            ]
        });
        if (!seleccion) {
            return res.status(404).json({ message: 'Selección no encontrada' });
        }
        res.json(seleccion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una selección
const createSeleccion = async (req, res) => {
    try {
        const { 
            fechaSeleccion,
            magullado,
            rajado,
            botritis,
            remisionId,
            exportable // <-- Agregado aquí
        } = req.body;
        
        //Verificar que no exista una selección para esa remision
        const seleccionExistente = await SeleccionRelaciones.findOne({
            where: { remisionId }
        });

        if (seleccionExistente) {
            return res.status(400).json({ 
                message: 'Ya existe una selección para esta remisión',
                seleccionId: seleccionExistente.id
            });
        }

        //Verificar que existan todos los IDs relacionados
        const remision = await Remision.findByPk(remisionId);
        if (!remision) {
            return res.status(404).json({ message: 'Remisión no encontrada' });
        }
        
        //Crear la selección    
        const seleccion = await Seleccion.create({
            fechaSeleccion,
            magullado,
            rajado,
            botritis,
            remisionId,
            exportable // <-- Agregado aquí
        });

        //Verificar que el ID de la selección se generó correctamente
        if (!seleccion || !seleccion.id) {
            console.error('Error al obtener el ID de la selección creada:', seleccion);
            return res.status(500).json({ message: 'Error interno al crear la selección.' });
        }

        console.log('Selección creada con ID:', seleccion.id);

        //Crear las relaciones en SeleccionRelaciones
        await SeleccionRelaciones.create({
            seleccionId: seleccion.id,
            remisionId
        });

        console.log('Relación en SeleccionRelaciones creada para seleccionId:', seleccion.id);

        //Obtener la selección creada con sus relaciones
        const seleccionCreada = await Seleccion.findByPk(seleccion.id, {
            include: [
                {
                    model: SeleccionRelaciones,
                    include: [
                        { model: Remision }
                    ]
                }
            ]
        });

        res.status(201).json(seleccionCreada);
    }catch (error) {
        console.error('Error al crear la selección:', error);
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una selección
const updateSeleccion = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            fechaSeleccion,
            magullado,
            rajado,
            botritis,
            exportable, 
            remisionId
        } = req.body;

        const seleccion = await Seleccion.findByPk(id);
        if (!seleccion) {

            return res.status(404).json({ message: 'Selección no encontrada' });
        }

        //Verificar que no exista una selección con el mismo ID de remisión
        //const seleccionExistente = await SeleccionRelaciones.findOne({ where: { remisionId } });
        //if (seleccionExistente) {
        //    return res.status(400).json({ message: 'Ya existe una selección con este ID de remisión' });
        //}

        //Verificar que existan todos los IDs relacionados
        const [remision] = await Promise.all([
            Remision.findByPk(remisionId)
        ]);

        if (!remision) {
            return res.status(404).json({ message: 'Remisión no encontrada' });
        }       

        //Actualizar la selección
        await seleccion.update({
            fechaSeleccion,
            magullado,
            rajado,
            botritis,
            exportable
        });

        //Actualizar las relaciones en SeleccionRelaciones
        await SeleccionRelaciones.update(
            {
                remisionId
            },
            {
                where: { seleccionId: seleccion.id }
            }
        );

        //Obtener la selección actualizada con sus relaciones
        const seleccionActualizada = await Seleccion.findByPk(seleccion.id, {
            include: [
                {
                    model: SeleccionRelaciones,
                    include: [
                        { model: Remision }
                    ]
                } 
            ]
        });

        res.json(seleccionActualizada);
    } catch (error) {
            res.status(500).json({ message: error.message });
    }
};

// Eliminar una selección
const deleteSeleccion = async (req, res) => {
    try {
        const seleccion = await Seleccion.findByPk(req.params.id);
        if (!seleccion) {
            return res.status(404).json({ message: 'Selección no encontrada' });
        }

        //Eliminar las relaciones primero

        await SeleccionRelaciones.destroy({
            where: { seleccionId: seleccion.id }
        });

        //Eliminar la selección
        await seleccion.destroy();

        res.json({ message: 'Selección eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllSelecciones,
    getSeleccionById,
    createSeleccion,
    updateSeleccion,
    deleteSeleccion
};
const Presentacion = require('../models/Presentacion');

// Obtener todas las presentaciones
const getAllPresentaciones = async (req, res) => {
    try {
        const presentaciones = await Presentacion.findAll();
        res.json(presentaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una presentación por ID
const getPresentacionById = async (req, res) => {
    try {
        const presentacion = await Presentacion.findByPk(req.params.id);
        if (!presentacion) {
            return res.status(404).json({ message: 'Presentación no encontrada' });
        }
        res.json(presentacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva presentación
const createPresentacion = async (req, res) => {
    try {
        const { nombre } = req.body;
        const presentacion = await Presentacion.create({ nombre });
        res.status(201).json(presentacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una presentación
const updatePresentacion = async (req, res) => {
    try {
        const { nombre } = req.body;
        const presentacion = await Presentacion.findByPk(req.params.id);

        if (!presentacion) {
            return res.status(404).json({ message: 'Presentación no encontrada' });
        }

        await presentacion.update({ nombre });
        res.json(presentacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una presentación
const deletePresentacion = async (req, res) => {
    try {
        const presentacion = await Presentacion.findByPk(req.params.id);
        if (!presentacion) {
            return res.status(404).json({ message: 'Presentación no encontrada' });
        }

        await presentacion.destroy();
        res.json({ message: 'Presentación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllPresentaciones,
    getPresentacionById,
    createPresentacion,
    updatePresentacion,
    deletePresentacion
}; 
const TipoPresentacion = require('../models/TipoPresentacion');

// Obtener todos los tipos de presentación
const getAllTipoPresentaciones = async (req, res) => {
    try {
        const tiposPresentacion = await TipoPresentacion.findAll();
        res.json(tiposPresentacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un tipo de presentación por ID
const getTipoPresentacionById = async (req, res) => {
    try {
        const tipoPresentacion = await TipoPresentacion.findByPk(req.params.id);
        if (!tipoPresentacion) {
            return res.status(404).json({ message: 'Tipo de Presentación no encontrado' });
        }
        res.json(tipoPresentacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo tipo de presentación
const createTipoPresentacion = async (req, res) => {
    try {
        const { nombre, kg } = req.body;
        const tipoPresentacion = await TipoPresentacion.create({ nombre, kg });
        res.status(201).json(tipoPresentacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un tipo de presentación
const updateTipoPresentacion = async (req, res) => {
    try {
        const { nombre, kg } = req.body;
        const tipoPresentacion = await TipoPresentacion.findByPk(req.params.id);

        if (!tipoPresentacion) {
            return res.status(404).json({ message: 'Tipo de Presentación no encontrado' });
        }

        await tipoPresentacion.update({ nombre, kg });
        res.json(tipoPresentacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un tipo de presentación
const deleteTipoPresentacion = async (req, res) => {
    try {
        const tipoPresentacion = await TipoPresentacion.findByPk(req.params.id);
        if (!tipoPresentacion) {
            return res.status(404).json({ message: 'Tipo de Presentación no encontrado' });
        }

        await tipoPresentacion.destroy();
        res.json({ message: 'Tipo de Presentación eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTipoPresentaciones,
    getTipoPresentacionById,
    createTipoPresentacion,
    updateTipoPresentacion,
    deleteTipoPresentacion
}; 
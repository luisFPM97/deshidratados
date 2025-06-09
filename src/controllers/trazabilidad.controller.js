const Trazabilidad = require('../models/Trazabilidad');

// Obtener todos los números de trazabilidad
const getAllTrazabilidades = async (req, res) => {
    try {
        const trazabilidades = await Trazabilidad.findAll();
        res.json(trazabilidades);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un número de trazabilidad por ID
const getTrazabilidadById = async (req, res) => {
    try {
        const trazabilidad = await Trazabilidad.findByPk(req.params.id);
        if (!trazabilidad) {
            return res.status(404).json({ message: 'Número de trazabilidad no encontrado' });
        }
        res.json(trazabilidad);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo número de trazabilidad
const createTrazabilidad = async (req, res) => {
    try {
        const { numero } = req.body;

        // Verificar si ya existe un número de trazabilidad con el mismo número
        const trazabilidadExistente = await Trazabilidad.findOne({ where: { numero } });
        if (trazabilidadExistente) {
            return res.status(400).json({ message: 'Ya existe un número de trazabilidad con este valor' });
        }

        const trazabilidad = await Trazabilidad.create({ numero });
        res.status(201).json(trazabilidad);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un número de trazabilidad
const updateTrazabilidad = async (req, res) => {
    try {
        const { numero } = req.body;
        const trazabilidad = await Trazabilidad.findByPk(req.params.id);

        if (!trazabilidad) {
            return res.status(404).json({ message: 'Número de trazabilidad no encontrado' });
        }

        // Si se está actualizando el número, verificar que no exista
        if (numero && numero !== trazabilidad.numero) {
            const trazabilidadExistente = await Trazabilidad.findOne({ where: { numero } });
            if (trazabilidadExistente) {
                return res.status(400).json({ message: 'Ya existe un número de trazabilidad con este valor' });
            }
        }

        await trazabilidad.update({ numero });
        res.json(trazabilidad);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un número de trazabilidad
const deleteTrazabilidad = async (req, res) => {
    try {
        const trazabilidad = await Trazabilidad.findByPk(req.params.id);
        if (!trazabilidad) {
            return res.status(404).json({ message: 'Número de trazabilidad no encontrado' });
        }

        await trazabilidad.destroy();
        res.json({ message: 'Número de trazabilidad eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTrazabilidades,
    getTrazabilidadById,
    createTrazabilidad,
    updateTrazabilidad,
    deleteTrazabilidad
};

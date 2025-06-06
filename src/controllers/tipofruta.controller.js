const Tipofruta = require('../models/Tipofruta');
const Remision = require('../models/Remision');

// Obtener todos los tipos de fruta
const getAllTipofrutas = async (req, res) => {
    try {
        const tipofrutas = await Tipofruta.findAll({
            include: [{
                model: Remision,
                attributes: ['id', 'numero']
            }]
        });
        res.json(tipofrutas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un tipo de fruta por ID
const getTipofrutaById = async (req, res) => {
    try {
        const tipofruta = await Tipofruta.findByPk(req.params.id, {
            include: [{
                model: Remision,
                attributes: ['id', 'numero']
            }]
        });
        if (!tipofruta) {
            return res.status(404).json({ message: 'Tipo de fruta no encontrado' });
        }
        res.json(tipofruta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo tipo de fruta
const createTipofruta = async (req, res) => {
    try {
        const { nombre } = req.body;

        // Validar que el nombre no esté duplicado
        const tipofrutaExistente = await Tipofruta.findOne({ where: { nombre } });
        if (tipofrutaExistente) {
            return res.status(400).json({ message: 'Ya existe un tipo de fruta con este nombre' });
        }

        const tipofruta = await Tipofruta.create({
            nombre
        });

        res.status(201).json(tipofruta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un tipo de fruta
const updateTipofruta = async (req, res) => {
    try {
        const { nombre } = req.body;
        const tipofruta = await Tipofruta.findByPk(req.params.id);

        if (!tipofruta) {
            return res.status(404).json({ message: 'Tipo de fruta no encontrado' });
        }

        // Si se está actualizando el nombre, validar que no esté duplicado
        if (nombre && nombre !== tipofruta.nombre) {
            const tipofrutaExistente = await Tipofruta.findOne({ where: { nombre } });
            if (tipofrutaExistente) {
                return res.status(400).json({ message: 'Ya existe un tipo de fruta con este nombre' });
            }
        }

        await tipofruta.update({
            nombre: nombre || tipofruta.nombre
        });

        res.json(tipofruta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un tipo de fruta
const deleteTipofruta = async (req, res) => {
    try {
        const tipofruta = await Tipofruta.findByPk(req.params.id);
        if (!tipofruta) {
            return res.status(404).json({ message: 'Tipo de fruta no encontrado' });
        }

        // Verificar si hay remisiones asociadas
        const remisionesAsociadas = await Remision.count({
            where: { tipofrutaId: tipofruta.id }
        });

        if (remisionesAsociadas > 0) {
            return res.status(400).json({ 
                message: 'No se puede eliminar el tipo de fruta porque tiene remisiones asociadas' 
            });
        }

        await tipofruta.destroy();
        res.json({ message: 'Tipo de fruta eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTipofrutas,
    getTipofrutaById,
    createTipofruta,
    updateTipofruta,
    deleteTipofruta
}; 
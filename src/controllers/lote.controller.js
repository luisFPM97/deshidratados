const Finca = require("../models/Finca");
const Lote = require("../models/Lote");
const FrutaLote = require("../models/FrutaLote");
const Fruta  = require("../models/Fruta");


// Obtener todos los lotes
const getAllLotes = async (req, res) => {
    try {
        const lotes = await Lote.findAll({
            include: [
                { model: Finca },
                { model: FrutaLote,
                    include: [
                        {model: Fruta}
                    ]
                }
            ]
        });
        res.json(lotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un lote por ID
const getLoteById = async (req, res) => {
    try {
        const lote = await Lote.findByPk(req.params.id, {
            include: [
                { model: Finca },
                { model: FrutaLote}
            ]
        });
        if (!lote) {
            return res.status(404).json({ message: 'Lote no encontrado' });
        }
        res.json(lote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo lote
const createLote = async (req, res) => {
    try {
        const { numero, fincaId } = req.body;

        // Verificar que la finca exista
        const finca = await Finca.findByPk(fincaId);
        if (!finca) {
            return res.status(404).json({ message: 'Finca no encontrada' });
        }

        const lote = await Lote.create({
            numero,
            fincaId
        });

        const loteCreado = await Lote.findByPk(lote.id, {
            include: [
                { model: Finca }
            ]
        });

        res.status(201).json(loteCreado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un lote
const updateLote = async (req, res) => {
    try {
        const { numero, fincaId } = req.body;
        const lote = await Lote.findByPk(req.params.id);

        if (!lote) {
            return res.status(404).json({ message: 'Lote no encontrado' });
        }

        // Verificar que la finca exista si se está actualizando
        if (fincaId) {
            const finca = await Finca.findByPk(fincaId);
            if (!finca) {
                return res.status(404).json({ message: 'Finca no encontrada' });
            }
        }

        await lote.update({
            numero: numero || lote.numero,
            fincaId: fincaId || lote.fincaId
        });

        const loteActualizado = await Lote.findByPk(lote.id, {
            include: [
                { model: Finca }
            ]
        });

        res.json(loteActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un lote
const deleteLote = async (req, res) => {
    try {
        const lote = await Lote.findByPk(req.params.id);
        if (!lote) {
            return res.status(404).json({ message: 'Lote no encontrado' });
        }

        await lote.destroy();
        res.json({ message: 'Lote eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllLotes,
    getLoteById,
    createLote,
    updateLote,
    deleteLote
}; 
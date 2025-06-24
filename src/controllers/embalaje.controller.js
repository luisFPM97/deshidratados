const Embalaje = require('../models/Embalaje');
const Factura = require('../models/Factura');
const Embarque = require('../models/Embarque');
const Presentacion = require('../models/Presentacion');
const TipoPresentacion = require('../models/TipoPresentacion');
const Remision = require('../models/Remision');

// Obtener todos los embalajes
const getAllEmbalajes = async (req, res) => {
    try {
        const embalajes = await Embalaje.findAll({
            include: [
                { model: Embarque, include: [{ model: Factura, attributes: ['numero'] }] },
                { model: Presentacion },
                { model: TipoPresentacion },
                { model: Remision }
            ]
        });
        res.json(embalajes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un embalaje por ID
const getEmbalajeById = async (req, res) => {
    try {
        const embalaje = await Embalaje.findByPk(req.params.id, {
            include: [
                { model: Embarque, include: [{ model: Factura, attributes: ['numero'] }] },
                { model: Presentacion },
                { model: TipoPresentacion },
                { model: Remision }
            ]
        });
        if (!embalaje) {
            return res.status(404).json({ message: 'Embalaje no encontrado' });
        }
        res.json(embalaje);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo embalaje
const createEmbalaje = async (req, res) => {
    try {
        const {
            estiba,
            numeroDeCajas,
            fechaDeEmpaque,
            kgEmpacado,
            embarqueId,
            presentacionId,
            tipoPresentacionId,
            remisionId
        } = req.body;

        // Verificar que existan todos los IDs relacionados
        const [embarque, presentacion, tipoPresentacion, remision] = await Promise.all([
            Embarque.findByPk(embarqueId),
            Presentacion.findByPk(presentacionId),
            TipoPresentacion.findByPk(tipoPresentacionId),
            Remision.findByPk(remisionId)
        ]);

        if (!embarque || !presentacion || !tipoPresentacion || !remision) {
            return res.status(400).json({ message: 'Uno o más IDs relacionados no existen' });
        }

        const embalaje = await Embalaje.create({
            estiba,
            numeroDeCajas,
            fechaDeEmpaque,
            kgEmpacado,
            embarqueId,
            presentacionId,
            tipoPresentacionId,
            remisionId
        });

        const embalajeCreado = await Embalaje.findByPk(embalaje.id, {
            include: [
                { model: Embarque, include: [{ model: Factura, attributes: ['numero'] }] },
                { model: Presentacion },
                { model: TipoPresentacion },
                { model: Remision }
            ]
        });

        res.status(201).json(embalajeCreado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un embalaje
const updateEmbalaje = async (req, res) => {
    try {
        const {
            estiba,
            numeroDeCajas,
            fechaDeEmpaque,
            kgEmpacado,
            embarqueId,
            presentacionId,
            tipoPresentacionId,
            remisionId
        } = req.body;

        const embalaje = await Embalaje.findByPk(req.params.id);
        if (!embalaje) {
            return res.status(404).json({ message: 'Embalaje no encontrado' });
        }

        // Verificar que existan todos los IDs relacionados si se están actualizando
        const [embarque, presentacion, tipoPresentacion, remision] = await Promise.all([
            embarqueId ? Embarque.findByPk(embarqueId) : null,
            presentacionId ? Presentacion.findByPk(presentacionId) : null,
            tipoPresentacionId ? TipoPresentacion.findByPk(tipoPresentacionId) : null,
            remisionId ? Remision.findByPk(remisionId) : null
        ]);

        if (
            (embarqueId && !embarque) ||
            (presentacionId && !presentacion) ||
            (tipoPresentacionId && !tipoPresentacion) ||
            (remisionId && !remision)
        ) {
            return res.status(400).json({ message: 'Uno o más IDs relacionados no existen' });
        }

        await embalaje.update({
            estiba: estiba || embalaje.estiba,
            numeroDeCajas: numeroDeCajas || embalaje.numeroDeCajas,
            fechaDeEmpaque: fechaDeEmpaque || embalaje.fechaDeEmpaque,
            kgEmpacado: kgEmpacado || embalaje.kgEmpacado,
            embarqueId: embarqueId || embalaje.embarqueId,
            presentacionId: presentacionId || embalaje.presentacionId,
            tipoPresentacionId: tipoPresentacionId || embalaje.tipoPresentacionId,
            remisionId: remisionId || embalaje.remisionId
        });

        const embalajeActualizado = await Embalaje.findByPk(embalaje.id, {
            include: [
                { model: Embarque, include: [{ model: Factura, attributes: ['numero'] }] },
                { model: Presentacion },
                { model: TipoPresentacion },
                { model: Remision }
            ]
        });

        res.json(embalajeActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un embalaje
const deleteEmbalaje = async (req, res) => {
    try {
        const embalaje = await Embalaje.findByPk(req.params.id);
        if (!embalaje) {
            return res.status(404).json({ message: 'Embalaje no encontrado' });
        }

        await embalaje.destroy();
        res.json({ message: 'Embalaje eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllEmbalajes,
    getEmbalajeById,
    createEmbalaje,
    updateEmbalaje,
    deleteEmbalaje
}; 
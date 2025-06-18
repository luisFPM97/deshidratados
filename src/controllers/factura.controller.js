const Factura = require('../models/Factura');
const Embarque = require('../models/Embarque');

// Obtener todas las facturas
const getAllFacturas = async (req, res) => {
    try {
        const facturas = await Factura.findAll({
            include: [{
                model: Embarque,
                attributes: ['numero']
            }]
        });
        res.json(facturas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una factura por ID
const getFacturaById = async (req, res) => {
    try {
        const factura = await Factura.findByPk(req.params.id, {
            include: [{
                model: Embarque,
                attributes: ['numero']
            }]
        });
        if (!factura) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }
        res.json(factura);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva factura
const createFactura = async (req, res) => {
    try {
        const { numero, descripcion, embarqueId } = req.body;

        // Validar que el embarque existe
        const embarque = await Embarque.findByPk(embarqueId);
        if (!embarque) {
            return res.status(404).json({ message: 'Embarque no encontrado' });
        }

        // Validar que el número no esté duplicado
        const facturaExistente = await Factura.findOne({ where: { numero } });
        if (facturaExistente) {
            return res.status(400).json({ message: 'Ya existe una factura con este número' });
        }

        const factura = await Factura.create({
            numero,
            descripcion,
            embarqueId
        });

        res.status(201).json(factura);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una factura
const updateFactura = async (req, res) => {
    try {
        const { numero, descripcion, embarqueId } = req.body;
        const factura = await Factura.findByPk(req.params.id);

        if (!factura) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }

        // Si se está actualizando el embarque, validar que existe
        if (embarqueId) {
            const embarque = await Embarque.findByPk(embarqueId);
            if (!embarque) {
                return res.status(404).json({ message: 'Embarque no encontrado' });
            }
        }

        // Si se está actualizando el número, validar que no esté duplicado
        if (numero && numero !== factura.numero) {
            const facturaExistente = await Factura.findOne({ where: { numero } });
            if (facturaExistente) {
                return res.status(400).json({ message: 'Ya existe una factura con este número' });
            }
        }

        await factura.update({
            numero: numero || factura.numero,
            descripcion: descripcion !== undefined ? descripcion : factura.descripcion,
            embarqueId: embarqueId || factura.embarqueId
        });

        res.json(factura);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una factura
const deleteFactura = async (req, res) => {
    try {
        const factura = await Factura.findByPk(req.params.id);
        if (!factura) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }

        await factura.destroy();
        res.json({ message: 'Factura eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllFacturas,
    getFacturaById,
    createFactura,
    updateFactura,
    deleteFactura
}; 
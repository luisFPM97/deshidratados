const Embarque = require('../models/Embarque'); // Importar el modelo Embarque
const Factura = require('../models/Factura'); // Importar el modelo Factura

// Obtener todos los embarques
const getAllEmbarques = async (req, res) => {
    try {
        const embarques = await Embarque.findAll({
            include: [{
                model: Factura,
                attributes: ['numero']
            }]
        });
        res.json(embarques);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un embarque por ID
const getEmbarqueById = async (req, res) => {
    try {
        const embarque = await Embarque.findByPk(req.params.id, {
            include: [{
                model: Factura,
                attributes: ['numero']
            }]
        });
        if (!embarque) {
            return res.status(404).json({ message: 'Embarque no encontrado' });
        }
        res.json(embarque);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo embarque
const createEmbarque = async (req, res) => {
    try {
        const { numero, fechaDespacho } = req.body;
        const embarque = await Embarque.create({ numero, fechaDespacho });
        res.status(201).json(embarque);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un embarque
const updateEmbarque = async (req, res) => {
    try {
        const { numero, fechaDespacho } = req.body;
        const embarque = await Embarque.findByPk(req.params.id);
        console.log(embarque)
        if (!embarque) {
            return res.status(404).json({ message: 'Embarque no encontrado' });
        }

        await embarque.update({ numero, fechaDespacho });
        res.json(embarque);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un embarque
const deleteEmbarque = async (req, res) => {
    try {
        const embarque = await Embarque.findByPk(req.params.id);
        if (!embarque) {
            return res.status(404).json({ message: 'Embarque no encontrado' });
        }

        await embarque.destroy();
        res.json({ message: 'Embarque eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllEmbarques,
    getEmbarqueById,
    createEmbarque,
    updateEmbarque,
    deleteEmbarque
}; 
const GGN = require('../models/GGN');
const Productor = require('../models/Productores');

//Obtener todos los GGN
const getAllGGNs = async (req, res) => {
    try {
        const ggns = await GGN.findAll({
            include: [{
                model: Productor,
                attributes: ['nombre', 'codigo']
            }]
        });
        res.json(ggns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Obtener un GGN por ID
const getGGNById = async (req, res) => {
    try {
        const ggn = await GGN.findByPk(req.params.id, {
            include: [{
                model: Productor,
                attributes: ['nombre', 'codigo']
            }]
        });
        if (!ggn) {
            return res.status(404).json({ message: 'GGN no encontrado' });
        }
        res.json(ggn);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Crear un nuevo GGN
const createGGN = async (req, res) => {
    try {
        const { numero, fechaEmision, fechaVencimiento, productorId } = req.body;

        // Validar que el productor existe
        const productor = await Productor.findByPk(productorId);
        if (!productor) {
            return res.status(404).json({ message: 'productor no encontrado' });
        }

        // Validar fechas
        const fechaEmisionDate = new Date(fechaEmision);
        const fechaVencimientoDate = new Date(fechaVencimiento);

        if (fechaEmisionDate >= fechaVencimientoDate) {
            return res.status(400).json({ message: 'La fecha de emisión debe ser anterior a la fecha de vencimiento' });
        }

        const ggn = await GGN.create({
            numero,
            fechaEmision: fechaEmisionDate,
            fechaVencimiento: fechaVencimientoDate,
            productorId
        });

        res.status(201).json(ggn);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un GGN
const updateGGN = async (req, res) => {
    try {
        const { numero, fechaEmision, fechaVencimiento, productorId } = req.body;
        const ggn = await GGN.findByPk(req.params.id);

        if (!ggn) {
            return res.status(404).json({ message: 'GGN no encontrado' });
        }

        // Si se está actualizando el productor, validar que existe
        if (productorId) {
            const productor = await Productor.findByPk(productorId);
            if (!productor) {
                return res.status(404).json({ message: 'Productor no encontrado' });
            }
        }

        // Si se está actualizando el número, validar que no esté duplicado
        if (numero && numero !== ggn.numero) {
            const ggnExistente = await GGN.findOne({ where: { numero } });
            if (ggnExistente) {
                return res.status(400).json({ message: 'Ya existe un certificado con este número' });
            }
        }

        // Validar fechas si se están actualizando
        if (fechaEmision || fechaVencimiento) {
            const fechaEmisionDate = fechaEmision ? new Date(fechaEmision) : ggn.fechaEmision;
            const fechaVencimientoDate = fechaVencimiento ? new Date(fechaVencimiento) : ggn.fechaVencimiento;

            if (fechaEmisionDate >= fechaVencimientoDate) {
                return res.status(400).json({ message: 'La fecha de emisión debe ser anterior a la fecha de vencimiento' });
            }
        }

        await ggn.update({
            numero: numero || ggn.numero,
            fechaEmision: fechaEmision ? new Date(fechaEmision) : ggn.fechaEmision,
            fechaVencimiento: fechaVencimiento ? new Date(fechaVencimiento) : ggn.fechaVencimiento,
            productorId: productorId || ggn.productorId
        });

        res.json(ggn);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un GGN
const deleteGGN = async (req, res) => {
    try {
        const ggn = await GGN.findByPk(req.params.id);
        if (!ggn) {
            return res.status(404).json({ message: 'GGN no encontrado' });
        }

        await ggn.destroy();
        res.json({ message: 'GGN eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllGGNs,
    getGGNById,
    createGGN,
    updateGGN,
    deleteGGN
}; 

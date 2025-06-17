const Certica = require('../models/Certica');
const Finca = require('../models/Finca');
const Productor = require('../models/Productores');

// Obtener todos los certificados
const getAllCerticas = async (req, res) => {
    try {
        const certicas = await Certica.findAll({
            include: [{
                model: Finca,
                attributes: ['nombre', 'codigo'],
                include: [{
                    model: Productor,
                    attributes: ['nombre', 'codigo']
                }]
            }]
        });
        res.json(certicas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un certificado por ID
const getCerticaById = async (req, res) => {
    try {
        const certica = await Certica.findByPk(req.params.id, {
            include: [{
                model: Finca,
                attributes: ['nombre', 'codigo'],
                include: [{
                    model: Productor,
                    attributes: ['nombre', 'codigo']
                }]
            }]
        });
        if (!certica) {
            return res.status(404).json({ message: 'Certificado no encontrado' });
        }
        res.json(certica);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo certificado
const createCertica = async (req, res) => {
    try {
        const { numero, fechaEmision, fechaVencimiento, fincaId } = req.body;

        // Validar que la finca existe
        const finca = await Finca.findByPk(fincaId);
        if (!finca) {
            return res.status(404).json({ message: 'Finca no encontrada' });
        }

        // Validar que el número no esté duplicado
        //if (certicaExistente) {
        //    const certicaExistente = await Certica.findOne({ where: { numero } });
        //    return res.status(400).json({ message: 'Ya existe un certificado con este número' });
        //}

        // Validar fechas
        const fechaEmisionDate = new Date(fechaEmision);
        const fechaVencimientoDate = new Date(fechaVencimiento);

        if (fechaEmisionDate >= fechaVencimientoDate) {
            return res.status(400).json({ message: 'La fecha de emisión debe ser anterior a la fecha de vencimiento' });
        }

        const certica = await Certica.create({
            numero,
            fechaEmision: fechaEmisionDate,
            fechaVencimiento: fechaVencimientoDate,
            fincaId
        });

        res.status(201).json(certica);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un certificado
const updateCertica = async (req, res) => {
    try {
        const { numero, fechaEmision, fechaVencimiento, fincaId } = req.body;
        const certica = await Certica.findByPk(req.params.id);

        if (!certica) {
            return res.status(404).json({ message: 'Certificado no encontrado' });
        }

        // Si se está actualizando la finca, validar que existe
        if (fincaId) {
            const finca = await Finca.findByPk(fincaId);
            if (!finca) {
                return res.status(404).json({ message: 'Finca no encontrada' });
            }
        }

        // Si se está actualizando el número, validar que no esté duplicado
        if (numero && numero !== certica.numero) {
            const certicaExistente = await Certica.findOne({ where: { numero } });
            if (certicaExistente) {
                return res.status(400).json({ message: 'Ya existe un certificado con este número' });
            }
        }

        // Validar fechas si se están actualizando
        if (fechaEmision || fechaVencimiento) {
            const fechaEmisionDate = fechaEmision ? new Date(fechaEmision) : certica.fechaEmision;
            const fechaVencimientoDate = fechaVencimiento ? new Date(fechaVencimiento) : certica.fechaVencimiento;

            if (fechaEmisionDate >= fechaVencimientoDate) {
                return res.status(400).json({ message: 'La fecha de emisión debe ser anterior a la fecha de vencimiento' });
            }
        }

        await certica.update({
            numero: numero || certica.numero,
            fechaEmision: fechaEmision ? new Date(fechaEmision) : certica.fechaEmision,
            fechaVencimiento: fechaVencimiento ? new Date(fechaVencimiento) : certica.fechaVencimiento,
            fincaId: fincaId || certica.fincaId
        });

        res.json(certica);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un certificado
const deleteCertica = async (req, res) => {
    try {
        const certica = await Certica.findByPk(req.params.id);
        if (!certica) {
            return res.status(404).json({ message: 'Certificado no encontrado' });
        }

        await certica.destroy();
        res.json({ message: 'Certificado eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCerticas,
    getCerticaById,
    createCertica,
    updateCertica,
    deleteCertica
}; 
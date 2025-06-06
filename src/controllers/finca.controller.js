const Finca = require('../models/Finca');
const Productor = require('../models/Productores');

// Obtener todas las fincas
const getAllFincas = async (req, res) => {
    try {
        const fincas = await Finca.findAll({
            include: [{
                model: Productor,
                attributes: ['nombre', 'codigo']
            }]
        });
        res.json(fincas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una finca por ID
const getFincaById = async (req, res) => {
    try {
        const finca = await Finca.findByPk(req.params.id, {
            include: [{
                model: Productor,
                attributes: ['nombre', 'codigo']
            }]
        });
        if (!finca) {
            return res.status(404).json({ message: 'Finca no encontrada' });
        }
        res.json(finca);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva finca
const createFinca = async (req, res) => {
    try {
        const { nombre, codigo, productorId } = req.body;

        // Verificar si el productor existe
        const productor = await Productor.findByPk(productorId);
        if (!productor) {
            return res.status(404).json({ message: 'Productor no encontrado' });
        }

        // Verificar si ya existe una finca con el mismo código
        const fincaExistente = await Finca.findOne({ where: { codigo } });
        if (fincaExistente) {
            return res.status(400).json({ message: 'Ya existe una finca con este código' });
        }

        const finca = await Finca.create({
            nombre,
            codigo,
            productorId
        });

        res.status(201).json(finca);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una finca
const updateFinca = async (req, res) => {
    try {
        const { nombre, codigo, productorId } = req.body;
        const finca = await Finca.findByPk(req.params.id);

        if (!finca) {
            return res.status(404).json({ message: 'Finca no encontrada' });
        }

        // Si se está actualizando el código, verificar que no exista
        if (codigo && codigo !== finca.codigo) {
            const fincaExistente = await Finca.findOne({ where: { codigo } });
            if (fincaExistente) {
                return res.status(400).json({ message: 'Ya existe una finca con este código' });
            }
        }

        // Si se está actualizando el productor, verificar que exista
        if (productorId) {
            const productor = await Productor.findByPk(productorId);
            if (!productor) {
                return res.status(404).json({ message: 'Productor no encontrado' });
            }
        }

        await finca.update({
            nombre: nombre || finca.nombre,
            codigo: codigo || finca.codigo,
            productorId: productorId || finca.productorId
        });

        res.json(finca);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una finca
const deleteFinca = async (req, res) => {
    try {
        const finca = await Finca.findByPk(req.params.id);
        if (!finca) {
            return res.status(404).json({ message: 'Finca no encontrada' });
        }

        await finca.destroy();
        res.json({ message: 'Finca eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllFincas,
    getFincaById,
    createFinca,
    updateFinca,
    deleteFinca
}; 
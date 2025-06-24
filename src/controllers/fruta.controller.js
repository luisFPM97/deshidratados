const Fruta = require('../models/Fruta');
const Lote = require('../models/Lote');
const Finca = require('../models/Finca');
const Productor = require('../models/Productores');
const FrutaLote = require('../models/FrutaLote');
const { Op } = require('sequelize');

// Obtener todas las frutas
const getAllFrutas = async (req, res) => {
    try {
        const frutas = await Fruta.findAll({
            
        });
        res.json(frutas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una fruta por ID
const getFrutaById = async (req, res) => {
    try {
        const fruta = await Fruta.findByPk(req.params.id, {
            
        });
        if (!fruta) {
            return res.status(404).json({ message: 'Fruta no encontrada' });
        }
        res.json(fruta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva fruta
const createFruta = async (req, res) => {
    try {
        const { nombre } = req.body;

        // Verificar si ya existe una fruta con el mismo nombre
        const frutaExistente = await Fruta.findOne({ where: { nombre } });
        if (frutaExistente) {
            return res.status(400).json({ message: 'Ya existe una fruta con este nombre' });
        }

        const fruta = await Fruta.create({ nombre });
        res.status(201).json(fruta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una fruta
const updateFruta = async (req, res) => {
    try {
        const frutaId = req.params.id;
        const { lotes } = req.body;

        // Verificar que la fruta exista
        const fruta = await Fruta.findByPk(frutaId);
        if (!fruta) {
            return res.status(404).json({ message: 'Fruta no encontrada' });
        }

        // Si se proporcionaron lotes, actualizar las relaciones
        if (lotes && Array.isArray(lotes)) {
            // Verificar que todos los lotes existan y tengan los datos requeridos
            for (const loteData of lotes) {
                const lote = await Lote.findByPk(loteData.loteId);
                if (!lote) {
                    return res.status(404).json({ message: `Lote con ID ${loteData.loteId} no encontrado` });
                }
                if (!loteData.fechaSiembra || !loteData.cantidadPlantas) {
                    return res.status(400).json({ 
                        message: `Faltan datos requeridos para el lote ${loteData.loteId}. Se requiere fechaSiembra y cantidadPlantas` 
                    });
                }
            }

            // Eliminar relaciones existentes
            //await FrutaLote.destroy({ where: { frutaId } });

            // Crear las nuevas relaciones con los datos actualizados
            await Promise.all(lotes.map(loteData => 
                FrutaLote.create({
                    frutaId,
                    loteId: loteData.loteId,
                    fechaSiembra: loteData.fechaSiembra,
                    cantidadPlantas: loteData.cantidadPlantas,
                    estado: loteData.estado || 'activo',
                    observaciones: loteData.observaciones
                })
            ));
        }

        // Obtener la fruta actualizada con sus relaciones
        const frutaActualizada = await Fruta.findByPk(frutaId, {
            
        });

        res.json(frutaActualizada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una fruta
const deleteFruta = async (req, res) => {
    try {
        const fruta = await Fruta.findByPk(req.params.id);
        if (!fruta) {
            return res.status(404).json({ message: 'Fruta no encontrada' });
        }

        await fruta.destroy();
        res.json({ message: 'Fruta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllFrutas,
    getFrutaById,
    createFruta,
    updateFruta,
    deleteFruta
}; 
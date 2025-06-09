const Remision = require('../models/Remision');
const Productor = require('../models/Productores');
const Finca = require('../models/Finca');
const Lote = require('../models/Lote');
const Certica = require('../models/Certica');
const Tipofruta = require('../models/Tipofruta');
const RemisionRelaciones = require('../models/RemisionRelaciones');

// Obtener todas las remisiones
const getAllRemisiones = async (req, res) => {
    try {
        const remisiones = await Remision.findAll({
            include: [
                {
                    model: RemisionRelaciones,
                    include: [
                        { model: Productor },
                        { model: Finca },
                        { model: Lote },
                        { model: Certica },
                        { model: Tipofruta }
                    ]
                }
            ]
        });
        res.json(remisiones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una remisión por ID
const getRemisionById = async (req, res) => {
    try {
        const remision = await Remision.findByPk(req.params.id, {
            include: [
                {
                    model: RemisionRelaciones,
                    include: [
                        { model: Productor },
                        { model: Finca },
                        { model: Lote },
                        { model: Certica },
                        { model: Tipofruta }
                    ]
                }
            ]
        });
        if (!remision) {
            return res.status(404).json({ message: 'Remisión no encontrada' });
        }
        res.json(remision);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva remisión
const createRemision = async (req, res) => {
    try {
        const {
            numero,
            fechaCosecha,
            fechaRecepcion,
            brutoKg,
            netoFrutaKg,
            numeroCanastas,
            netoCanastas,
            registroAplicacion,
            devolucionPuerta,
            productorId,
            fincaId,
            loteId,
            certicaId,
            tipofrutaId
        } = req.body;

        // Verificar si ya existe una remisión con el mismo número
        const remisionExistente = await Remision.findOne({ where: { numero } });
        if (remisionExistente) {
            return res.status(400).json({ message: 'Ya existe una remisión con este número' });
        }

        // Verificar que existan todos los IDs relacionados
        const [productor, finca, lote, certica, tipofruta] = await Promise.all([
            Productor.findByPk(productorId),
            Finca.findByPk(fincaId),
            Lote.findByPk(loteId),
            Certica.findByPk(certicaId),
            Tipofruta.findByPk(tipofrutaId)
        ]);

        if (!productor || !finca || !lote || !certica || !tipofruta) {
            return res.status(400).json({ message: 'Uno o más IDs relacionados no existen' });
        }

        // Crear la remisión
        const remision = await Remision.create({
            numero,
            fechaCosecha,
            fechaRecepcion,
            brutoKg,
            netoFrutaKg,
            numeroCanastas,
            netoCanastas,
            registroAplicacion,
            devolucionPuerta
        });

        // Verificar que el ID de la remisión se generó correctamente
        if (!remision || !remision.id) {
            console.error('Error al obtener el ID de la remisión creada:', remision);
            return res.status(500).json({ message: 'Error interno al crear la remisión.' });
        }

        console.log('Remision creada con ID:', remision.id);

        // Crear las relaciones en RemisionRelaciones
        await RemisionRelaciones.create({
            remisionId: remision.id,
            productorId,
            fincaId,
            loteId,
            certicaId,
            tipofrutaId
        });

        console.log('Relación en RemisionRelaciones creada para remisionId:', remision.id);

        //incluir trazabilidad


        // Obtener la remisión creada con sus relaciones
        const remisionCreada = await Remision.findByPk(remision.id, {
            include: [
                {
                    model: RemisionRelaciones,
                    include: [
                        { model: Productor },
                        { model: Finca },
                        { model: Lote },
                        { model: Certica },
                        { model: Tipofruta }
                    ]
                },
                {model: Trazabilidad}
            ]
        });

        res.status(201).json(remisionCreada);
    } catch (error) {
        console.error('Error al crear la remisión:', error);
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una remisión
const updateRemision = async (req, res) => {
    try {
        const {
            numero,
            fechaCosecha,
            fechaRecepcion,
            brutoKg,
            netoFrutaKg,
            numeroCanastas,
            netoCanastas,
            registroAplicacion,
            devolucionPuerta,
            productorId,
            fincaId,
            loteId,
            certicaId,
            tipofrutaId
        } = req.body;

        const remision = await Remision.findByPk(req.params.id);
        if (!remision) {
            return res.status(404).json({ message: 'Remisión no encontrada' });
        }

        // Si se está cambiando el número, verificar que no exista
        if (numero && numero !== remision.numero) {
            const remisionExistente = await Remision.findOne({ where: { numero } });
            if (remisionExistente) {
                return res.status(400).json({ message: 'Ya existe una remisión con este número' });
            }
        }

        // Verificar que existan todos los IDs relacionados
        const [productor, finca, lote, certica, tipofruta] = await Promise.all([
            Productor.findByPk(productorId),
            Finca.findByPk(fincaId),
            Lote.findByPk(loteId),
            Certica.findByPk(certicaId),
            Tipofruta.findByPk(tipofrutaId)
        ]);

        if (!productor || !finca || !lote || !certica || !tipofruta) {
            return res.status(400).json({ message: 'Uno o más IDs relacionados no existen' });
        }

        // Actualizar la remisión
        await remision.update({
            numero,
            fechaCosecha,
            fechaRecepcion,
            brutoKg,
            netoFrutaKg,
            numeroCanastas,
            netoCanastas,
            registroAplicacion,
            devolucionPuerta
        });

        // Actualizar las relaciones en RemisionRelaciones
        await RemisionRelaciones.update(
            {
                productorId,
                fincaId,
                loteId,
                certicaId,
                tipofrutaId
            },
            {
                where: { remisionId: remision.id }
            }
        );

        // Obtener la remisión actualizada con sus relaciones
        const remisionActualizada = await Remision.findByPk(remision.id, {
            include: [
                {
                    model: RemisionRelaciones,
                    include: [
                        { model: Productor },
                        { model: Finca },
                        { model: Lote },
                        { model: Certica },
                        { model: Tipofruta }
                    ]
                }
            ]
        });

        res.json(remisionActualizada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una remisión
const deleteRemision = async (req, res) => {
    try {
        const remision = await Remision.findByPk(req.params.id);
        if (!remision) {
            return res.status(404).json({ message: 'Remisión no encontrada' });
        }

        // Eliminar las relaciones primero
        await RemisionRelaciones.destroy({
            where: { remisionId: remision.id }
        });

        // Eliminar la remisión
        await remision.destroy();

        res.json({ message: 'Remisión eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllRemisiones,
    getRemisionById,
    createRemision,
    updateRemision,
    deleteRemision
}; 
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Remision = require('./Remision');
const Productor = require('./Productores');
const Finca = require('./Finca');
const Lote = require('./Lote');
const Certica = require('./Certica');
const Tipofruta = require('./Tipofruta');
const Trazabilidad = require('./Trazabilidad');

const RemisionRelaciones = sequelize.define('RemisionRelaciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    remisionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Remision,
            key: 'id'
        }
    },
    productorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Productor,
            key: 'id'
        }
    },
    fincaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Finca,
            key: 'id'
        }
    },
    loteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Lote,
            key: 'id'
        }
    },
    certicaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Certica,
            key: 'id'
        }
    },
    tipofrutaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tipofruta,
            key: 'id'
        }
    }, 
    trazabilidadId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Trazabilidad,
            key: 'id' 
        }
    }
});

// Relaciones
RemisionRelaciones.belongsTo(Remision, { foreignKey: 'remisionId' });
RemisionRelaciones.belongsTo(Productor, { foreignKey: 'productorId' });
RemisionRelaciones.belongsTo(Finca, { foreignKey: 'fincaId' });
RemisionRelaciones.belongsTo(Lote, { foreignKey: 'loteId' });
RemisionRelaciones.belongsTo(Certica, { foreignKey: 'certicaId' });
RemisionRelaciones.belongsTo(Tipofruta, { foreignKey: 'tipofrutaId' });
RemisionRelaciones.belongsTo(Trazabilidad, {foreignKey: 'trazabilidadId'});

Remision.hasMany(RemisionRelaciones, { foreignKey: 'remisionId' });
Productor.hasMany(RemisionRelaciones, { foreignKey: 'productorId' });
Finca.hasMany(RemisionRelaciones, { foreignKey: 'fincaId' });
Lote.hasMany(RemisionRelaciones, { foreignKey: 'loteId' });
Certica.hasMany(RemisionRelaciones, { foreignKey: 'certicaId' });
Tipofruta.hasMany(RemisionRelaciones, { foreignKey: 'tipofrutaId' });
Trazabilidad.hasOne(RemisionRelaciones, {foreignKey: 'trazabilidadId'});

module.exports = RemisionRelaciones; 
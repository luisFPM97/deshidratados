const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Fruta = require('./Fruta');
const Lote = require('./Lote');

const FrutaLote = sequelize.define('frutaLote', {
    frutaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Fruta,
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
    fechaSiembra: {
        type: DataTypes.DATE,
        allowNull: false
    },
    cantidadPlantas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo', 'en_mantenimiento'),
        allowNull: false,
        defaultValue: 'activo'
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

// Establecer las relaciones muchos a muchos
Fruta.belongsToMany(Lote, { 
    through: FrutaLote,
    foreignKey: 'frutaId'
});
Lote.belongsToMany(Fruta, { 
    through: FrutaLote,
    foreignKey: 'loteId'
});

module.exports = FrutaLote; 
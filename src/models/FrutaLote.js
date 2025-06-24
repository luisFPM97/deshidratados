const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Fruta = require('./Fruta');
const Lote = require('./Lote');


const FrutaLote = sequelize.define('frutaLote', {
    frutaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    loteId: {
        type: DataTypes.INTEGER,
        allowNull: false
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

FrutaLote.belongsTo(Fruta, { foreignKey: 'frutaId' });
Fruta.hasMany(FrutaLote, { foreignKey: 'frutaId'});
FrutaLote.belongsTo(Lote, { foreignKey: 'loteId'})
Lote.hasOne(FrutaLote, { foreignKey: 'loteId' });

module.exports = FrutaLote; 
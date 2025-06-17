const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Embarque = require('./Embarque');
const Presentacion = require('./Presentacion');
const TipoPresentacion = require('./TipoPresentacion');
const Remision = require('./Remision');

const Embalaje = sequelize.define('embalaje', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estiba: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    numeroDeCajas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fechaDeEmpaque: {
        type: DataTypes.DATE,
        allowNull: false
    },
    kgEmpacado: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    embarqueId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Embarque,
            key: 'id'
        }
    },
    presentacionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Presentacion,
            key: 'id'
        }
    },
    tipoPresentacionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TipoPresentacion,
            key: 'id'
        }
    },
    remisionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Remision,
            key: 'id'
        }
    }
});

Embalaje.belongsTo(Embarque,{foreignKey: 'embarqueId'});
Embalaje.belongsTo(Presentacion,{foreignKey: 'presentacionId'});
Embalaje.belongsTo(TipoPresentacion,{foreignKey: 'tipoPresentacionId'});
Embalaje.belongsTo(Remision,{foreignKey: 'remisionId'});

Embarque.hasMany(Embalaje,{foreignKey: 'embarqueId'});
Presentacion.hasMany(Embalaje,{foreignKey: 'presentacionId'});
TipoPresentacion.hasMany(Embalaje,{foreignKey: 'tipoPresentacionId'});
Remision.hasMany(Embalaje,{foreignKey: 'remisionId'})

module.exports = Embalaje; 
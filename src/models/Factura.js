const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Embarque = require('./Embarque');

const Factura = sequelize.define('Factura', {
    
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    embarqueId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Embarque,
            key: 'id'
        }
    }
});

// Relación con Embarque
Factura.belongsTo(Embarque, { foreignKey: 'embarqueId' });
Embarque.hasMany(Factura, { foreignKey: 'embarqueId' });

module.exports = Factura; 
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Productor = require('./Productores');

const GGN = sequelize.define('GGN', {
    
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaEmision: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fechaVencimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    productorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Productor,
            key: 'id'
        }
    }
});

// Relación con Productor
GGN.belongsTo(Productor, { foreignKey: 'productorId' });
Productor.hasMany(GGN, { foreignKey: 'productorId' });

module.exports = GGN; 
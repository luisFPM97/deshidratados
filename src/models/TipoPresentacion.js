const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const TipoPresentacion = sequelize.define('tipoPresentacion', {
    
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kg: {
        type: DataTypes.DECIMAL(10, 2), // 10 dígitos en total, 2 después del punto decimal
        allowNull: false
    }
});

module.exports = TipoPresentacion; 
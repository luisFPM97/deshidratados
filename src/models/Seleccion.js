const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Seleccion = sequelize.define('Seleccion', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaSeleccion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    magullado: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    rajado: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    botritis: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    }
});


module.exports = Seleccion; 
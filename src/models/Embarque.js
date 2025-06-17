const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Embarque = sequelize.define('embarque', {
    
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaDespacho: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

module.exports = Embarque; 
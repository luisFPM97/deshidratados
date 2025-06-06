const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Productor = sequelize.define('productor', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo:{
        type: DataTypes.STRING,
        allowNull: false
    }
    
});

module.exports = Productor;
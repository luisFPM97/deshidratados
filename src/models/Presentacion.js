const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Presentacion = sequelize.define('presentacion', {
    
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Presentacion; 
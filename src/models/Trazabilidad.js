const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Trazabilidad = sequelize.define('Trazabilidad', {
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Trazabilidad;
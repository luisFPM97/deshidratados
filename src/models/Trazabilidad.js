const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Remision = require('./Remision');

const Trazabilidad = sequelize.define('Trazabilidad', {
    numero: {
        type: DataTypes.STRING,
        allowNull: true
    }
});


module.exports = Trazabilidad;
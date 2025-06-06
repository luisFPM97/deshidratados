const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Manoobra = sequelize.define('manoobra', {
    area: {
        type: DataTypes.STRING,
        allowNull: false,
        enum: ['Fesco', 'Deshidratado'],
    },
    hora_inicio: {
        type: DataTypes.DATETIME,
        allowNull: false,
    },
    hora_fin: {
        type: DataTypes.DATETIME,
        allowNull: false,
    },
    TIMEPO:{
        type: DataTypes.TIME,
        allowNull: false,
    }
});

module.exports = Manoobra;
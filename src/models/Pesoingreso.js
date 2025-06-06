const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Pesoingreso= sequelize.define('pesoingreso', {
    peso: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
});

module.exports = Pesoingreso;
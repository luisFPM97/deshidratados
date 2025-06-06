const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Fruta = sequelize.define('fruta', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = Fruta; 
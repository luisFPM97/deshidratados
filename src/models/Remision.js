const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Remision = sequelize.define('Remision', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    fechaCosecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fechaRecepcion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    brutoKg: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    netoFrutaKg: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    numeroCanastas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    netoCanastas: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    registroAplicacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    devolucionPuerta: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

module.exports = Remision;
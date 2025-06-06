const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Remision = require('./Remision');

const Tipofruta = sequelize.define('Tipofruta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

// Relación con Remision (uno a muchos)
Tipofruta.hasMany(Remision, { foreignKey: 'tipofrutaId' });
Remision.belongsTo(Tipofruta, { foreignKey: 'tipofrutaId' });

module.exports = Tipofruta; 
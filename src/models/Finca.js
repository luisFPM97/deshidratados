const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Productor = require('./Productores');

const Finca = sequelize.define('finca', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    productorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Productor,
            key: 'id'
        }
    }
});

// Establecer la relación uno a muchos
Productor.hasMany(Finca);
Finca.belongsTo(Productor);

module.exports = Finca; 
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Finca = require('./Finca');
const Tipofruta = require('./Tipofruta');

const Lote = sequelize.define('lote', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fincaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Finca,
            key: 'id'
        }
    }
});

// Relaciones
Lote.belongsTo(Finca, { foreignKey: 'fincaId' });
Finca.hasMany(Lote, { foreignKey: 'fincaId' });

module.exports = Lote; 
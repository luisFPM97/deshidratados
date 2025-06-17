const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Finca = require('./Finca');

const Certica = sequelize.define('Certica', {
    
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaEmision: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fechaVencimiento: {
        type: DataTypes.DATE,
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

// Relación con Finca
Certica.belongsTo(Finca, { foreignKey: 'fincaId' });
Finca.hasMany(Certica, { foreignKey: 'fincaId' });

module.exports = Certica; 
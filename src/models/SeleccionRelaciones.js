const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Remision = require('./Remision');
const Seleccion = require('./Seleccion');

const SeleccionRelaciones = sequelize.define('SeleccionRelaciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    remisionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Remision,
            key: 'id'
        }
    },
    seleccionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Seleccion,
            key: 'id'
        }
    }
});

// Relaciones
SeleccionRelaciones.belongsTo(Remision, { foreignKey: 'remisionId' });
SeleccionRelaciones.belongsTo(Seleccion, { foreignKey: 'seleccionId' });

export default SeleccionRelaciones;

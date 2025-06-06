const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Area = sequelize.define('area', {
    area: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Area ;
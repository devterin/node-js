const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Clazz = sequelize.define('Clazz', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'clazz',
    timestamps: false,
});

module.exports = Clazz;

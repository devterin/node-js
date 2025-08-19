const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Clazz = require('./Clazz.js');

const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    gender: { type: DataTypes.TINYINT },
    birthday: { type: DataTypes.DATE },
    class_id: { type: DataTypes.INTEGER, references: { model: Clazz, key: 'id' } }
}, {
    tableName: 'students',
    timestamps: false,
});

Student.belongsTo(Clazz, { foreignKey: 'class_id', as: 'class' });

module.exports = Student;

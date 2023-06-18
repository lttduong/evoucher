'use strict';

const {Model, DataTypes} = require("sequelize");
const {sequelize} = require('./index');

class Game extends Model {}

Game.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {type: DataTypes.STRING, notNull: true, unique: true},
    type: {type: DataTypes.STRING, notNull: true},
    createdAt: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
}, {
    sequelize,
    modelName: 'Game',
    tableName: 'games'
});

module.exports = Game;
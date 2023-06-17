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
    type: {type: DataTypes.STRING, notNull: true}
}, {
    sequelize,
    modelName: 'Game',
    tableName: 'games'
});

module.exports = Game;
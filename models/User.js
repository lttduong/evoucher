'use strict';

const {Model, DataTypes} = require("sequelize");
const {sequelize} = require('./index');

class User extends Model {
    static associate(models) {
        // define association here
        User.belongsTo(models.Role, {foreignKey: 'roleId'});
        User.hasMany(models.Partner);
        User.hasMany(models.UserCoupon);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {type: DataTypes.STRING, notNull: true},
    lastName: {type: DataTypes.STRING, notNull: true},
    email: {type: DataTypes.STRING, notNull: true, unique: true},
    username: {type: DataTypes.STRING, notNull: true, unique: true},
    password: {type: DataTypes.STRING, notNull: true},
    birthDay: {type: DataTypes.DATE},
    address: DataTypes.STRING,
    roleId: {
        type: DataTypes.INTEGER,
        notNull: true
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
});

module.exports = User;
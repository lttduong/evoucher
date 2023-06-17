'use strict';

const {Model, DataTypes} = require("sequelize");
const {sequelize} = require('./index');

class Campaign extends Model {
    static associate(models) {
        // define association here
        Campaign.belongsTo(models.Partner, {foreignKey: 'partnerId'});
        Campaign.hasMany(models.Game);
        Campaign.hasMany(models.Coupon);
    }
}

Campaign.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {type: DataTypes.STRING, notNull: true},
    type: {type: DataTypes.STRING, notNull: true},
    status: {type: DataTypes.STRING, notNull: true},
    startDate: {type: DataTypes.DATE, notNull: true},
    endDate: {type: DataTypes.DATE, notNull: true},
    partnerId: {
        type: DataTypes.INTEGER,
        notNull: true
    }
}, {
    sequelize,
    modelName: 'Campaign',
    tableName: 'campaigns'
});

module.exports = Campaign;
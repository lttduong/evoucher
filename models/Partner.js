'use strict';

const {Model, DataTypes} = require("sequelize");
const {sequelize} = require('./index');

class Partner extends Model {
    static associate(models) {
        // define association here
        Partner.belongsTo(models.User, {foreignKey: 'userId'});
        Partner.hasMany(models.Campaign);
    }
}

Partner.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    companyName: {type: DataTypes.STRING, notNull: true},
    website: DataTypes.STRING,
    userId: {
        type:DataTypes.INTEGER,
        notNull: true
    },
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
    modelName: 'Partner',
    tableName: 'partners'
});

module.exports = Partner;
'use strict';

const {Model, DataTypes} = require("sequelize");
const {sequelize} = require('./index');

class CouponType extends Model {
    static associate(models) {
        // define association here
        Coupon.belongsTo(models.Partner, {foreignKey: 'partnerId'});
    }
}

CouponType.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {type: DataTypes.STRING, notNull: true},
    percent: {type: DataTypes.DOUBLE, notNull: true},
    discount: {type: DataTypes.DECIMAL, notNull: true},
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
    modelName: 'CouponType',
    tableName: 'coupon_types'
});

module.exports = CouponType;
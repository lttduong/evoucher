'use strict';

const {Model, DataTypes} = require("sequelize");
const {sequelize} = require('./index');

class UserCoupon extends Model {
    static associate(models) {
        // define association here
        UserCoupon.belongsTo(models.User, {foreignKey: 'userId'});
        UserCoupon.belongsTo(models.CouponType, {foreignKey: 'couponTypeId'});
    }
}

UserCoupon.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type:DataTypes.INTEGER,
        notNull: true
    },
    couponTypeId: {
        type:DataTypes.INTEGER,
        notNull: true
    },
    quantity: {
        type:DataTypes.INTEGER,
        notNull: true
    }
}, {
    sequelize,
    modelName: 'UserCoupon',
    tableName: 'user_coupon'
});

module.exports = UserCoupon;
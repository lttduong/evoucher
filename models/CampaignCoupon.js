'use strict';

const {Model, DataTypes} = require("sequelize");
const {sequelize} = require('./index');

class CampaignCoupon extends Model {
    static associate(models) {
        // define association here
        CampaignCoupon.belongsTo(models.Campaign, {foreignKey: 'campaignId'});
        CampaignCoupon.belongsTo(models.CouponType, {foreignKey: 'couponTypeId'});
    }
}

CampaignCoupon.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    campaignId: {
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
    },
    remainingAmount :{
        type:DataTypes.INTEGER,
        notNull: true
    }
}, {
    sequelize,
    modelName: 'CampaignCoupon',
    tableName: 'campaign_coupon'
});

module.exports = CampaignCoupon;
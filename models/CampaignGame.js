'use strict';

const {Model, DataTypes} = require("sequelize");
const {sequelize} = require('./index');

class CampaignGame extends Model {
    static associate(models) {
        // define association here
        CampaignGame.belongsTo(models.Campaign, {foreignKey: 'campaignId'});
        CampaignGame.belongsTo(models.Game, {foreignKey: 'gameId'});
    }
}

CampaignGame.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    campaignId: {
        type:DataTypes.INTEGER,
        notNull: true
    },
    gameId: {
        type:DataTypes.INTEGER,
        notNull: true
    }
}, {
    sequelize,
    modelName: 'CampaignGame',
    tableName: 'campaign_game'
});

module.exports = CampaignGame;
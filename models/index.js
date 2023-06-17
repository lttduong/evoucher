const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || 'development';

// DB config
const config = require("../config/config.json")[env];

// Connect to db by Sequelize
const sequelize = new Sequelize({
  host: config.host,
  dialect: config.dialect,
  database: config.database,
  username: config.username,
  password: config.password
});

module.exports = {
  sequelize: sequelize,
  Sequelize: Sequelize
}

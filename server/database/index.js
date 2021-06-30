const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER, // usuário
  process.env.DB_PASSWORD, // senha
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '-03:00',
  },
);

module.exports = sequelize;

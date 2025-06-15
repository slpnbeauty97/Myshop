// server/models/index.js
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Order = require('./order')(sequelize, DataTypes);  // This file must exist

module.exports = db;

const sequelize = require("../db");

const db = {};
db.Sequelize = sequelize.Sequelize;
db.sequelize = sequelize;

db.Star = require("../models/star_model");
db.Constellation = require("../models/constellation_model");

db.Constellation.hasMany(db.Star, {
  foreignKey: "constellation_id",
});
db.Star.belongsTo(db.Constellation);

module.exports = db;

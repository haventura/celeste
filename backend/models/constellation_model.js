const Sequelize = require("sequelize");
const db = require("../db.js");

const Constellation = db.define(
  "constellation",
  {
    constellation_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: true },
    right_ascension: { type: Sequelize.STRING, allowNull: true },
    declination: { type: Sequelize.STRING, allowNull: true },
    area: { type: Sequelize.FLOAT, allowNull: true },
  },
  {
    timestamps: false,
  }
);

module.exports = Constellation;

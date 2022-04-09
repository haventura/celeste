const Sequelize = require("sequelize");
const db = require("../db.js");

const Star = db.define(
  "star",
  {
    star_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: true },
    right_ascension: { type: Sequelize.STRING, allowNull: true },
    declination: { type: Sequelize.STRING, allowNull: true },
    apparent_magnitude: { type: Sequelize.FLOAT, allowNull: true },
    mass: { type: Sequelize.FLOAT, allowNull: true },
    radius: { type: Sequelize.FLOAT, allowNull: true },
    age: { type: Sequelize.FLOAT, allowNull: true },
  },
  {
    timestamps: false,
  }
);

module.exports = Star;

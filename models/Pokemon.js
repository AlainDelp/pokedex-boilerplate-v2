const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Pokemon = db.define("Pokemon", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trainer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Pokemon;
const Trainer = require("./Trainer");

Pokemon.belongsTo(Trainer);
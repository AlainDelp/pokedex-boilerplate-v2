///require("dotenv").config();
const Sequelize = require("sequelize");

///const db = new Sequelize("postgres://@localhost:5434/Pokedex");
const db = new Sequelize({
    dialect: 'postgres',
    port: 5434, 
    database: 'Pokedex',
    password: 'Project4',
  });

module.exports = db;
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'postgresql', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;

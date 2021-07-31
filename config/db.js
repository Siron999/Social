const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('db1d9ok335qra7', 'ofpjouoztujugu', '21096de98a18c37dc1bfa3d1b6c90a624cb92864e6337dc606c7abc7763b0d76', {
    host: 'ec2-54-195-76-73.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres'
});

module.exports = sequelize;

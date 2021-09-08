const Sequelize = require('sequelize');
const sequelize = require('../config/db.js');

const Post = sequelize.define('posts', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    caption: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    img: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    likes:{
        type:Sequelize.INTEGER,
    }
});

module.exports = Post;
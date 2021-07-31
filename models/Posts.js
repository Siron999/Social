const Sequelize = require('sequelize');
const sequelize = require('../config/db.js');

const Post = sequelize.define('posts', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    data: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
});

module.exports=Post;
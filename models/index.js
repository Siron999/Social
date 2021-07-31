const User = require('./User.js');
const Post = require('./Posts.js');
const sequelize = require('../config/db.js');

sequelize.sync({force: true}).then(() => console.log("Synced")).catch(err => console.log(err));

module.exports={
    User,Post
}
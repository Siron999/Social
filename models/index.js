const User = require('./User.js');
const Post = require('./Posts.js');
const ROLE = require('./roles');
const sequelize = require('../config/db.js');
const createAdmin = require('../config/adminCreate');

sequelize.sync({force: true}).then(async () => {
    console.log("Synced");
    await createAdmin({
        firstName: 'Siron',
        lastName: 'Shakya',
        username: 'siron999',
        email: 'sironshakya10@gmail.com',
        role: ROLE.ADM,
        password: 'password123'
    });
    console.log("Admin Created");
}).catch(err => console.log(err));

module.exports = {
    User, Post
}
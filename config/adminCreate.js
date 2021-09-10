const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createAdmin = async ({firstName, lastName, username, email, role, password}) => {

    //hashpassword
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, salt);


    return await User.create({firstName, lastName, username, email,role, password: hashedPassword});

}

module.exports = createAdmin;
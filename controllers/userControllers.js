const {User} = require('../models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger =  require('../config/logger');

const registerController = async (req, res) => {
    try {
        const {firstName, lastName, username, email, password, confirmPassword} = req.body;

        //checking if user is already registered
        const emailExist = await User.findOne({where: {email: req.body.email}});

        if (emailExist) return res.status(400).json({message: "Email Already Exists"});

        //checking if user is already registered
        const userExist = await User.findOne({where: {username: req.body.username}});
        if (userExist) return res.status(400).json({message: "Username Already Exists"});

        //confirm password
        if (password !== confirmPassword) return res.status(400).json({message: "Password Not Matching"});


        //hashpassword
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);


        const savedUser = await User.create({firstName, lastName, username, email, password: hashedPassword});

        //creating token
        const token = jwt.sign({id: savedUser.id}, process.env.TOKEN_SECRET);

        res.json({
            token, user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                username: savedUser.username,
                email: savedUser.email,
            }
        });

    } catch (e) {
        if (e.errors.length === 1) {
            res.status(400).json({message: e.errors[0].message});
        } else {
            res.status(400).json({message: e.errors.map((x) => x.message)});
        }
    }
}

const loginController = async (req, res) => {
    try {
        const {username, password} = req.body;

        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        let useragent = req.headers['user-agent'];
        //checking if user exists or not
        logger.log({
            level: "info",
            message: "Login Request",
            metadata: {method: req.method, ip, useragent,username}, // Put what you like as meta
        });

        //checking if user exists or not
        const user = await User.findOne({where: {username: username}});
        if (!user) return res.status(400).json({message: "User Not found"});

        //passwordCheck
        const passwordExist = await bcrypt.compare(password, user.password);
        if (!passwordExist) return res.status(400).send({message: "Password is incorrect"});

        //creating token
        const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET);

        res.json({
            token, user: {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
            }
        });

    } catch (e) {
        if (e.errors.length === 1) {
            res.status(400).json({message: e.errors[0].message});
        } else {
            res.status(400).json({message: e.errors.map((x) => x.message)});
        }
    }
}

const getUserInfoController = async (req, res) => {
    try {
        const user= await User.findByPk(req.user);

        if(!user) return res.send({message: "User not found"});

        res.status(200).json({user: {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
            }});

    } catch (err) {
        res.status(500).json({error:err.message});
    }
}

const allUsersController = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
}

module.exports = {
    registerController, loginController, getUserInfoController, allUsersController
}
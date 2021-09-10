const LoggedIn = require('../models/mongodb/LoggedIn');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const loggedInController = async (req, res) => {
    try {
        const users = await LoggedIn.find({message:"Logged In"});
        res.render("loggedIn",{users});
    } catch (e) {
        if (e.errors.length === 1) {
            res.status(400).json({message: e.errors[0].message});
        } else if (e.errors.length > 1) {
            res.status(400).json({message: e.errors.map((x) => x.message)});
        } else if(e.message){
            res.status(400).json({error:err.message});
        }else{
            res.status(400).json({message: "Could not process the request"});
        }
    }
};

const loginViewController = async (req, res) => {
    try {
        if(req.session.error){
           return res.render('login',{error:req.session.error});
        }
       return res.render('login');
    } catch (e) {
        if (e.errors.length === 1) {
            res.status(400).json({message: e.errors[0].message});
        } else if (e.errors.length > 1) {
            res.status(400).json({message: e.errors.map((x) => x.message)});
        } else if (e.message) {
            res.status(400).json({error: e.message});
        } else {
            res.status(400).json({message: "Could not process the request"});
        }
    }
}

const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;

        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        let useragent = req.headers['user-agent'];

        //checking if user exists or not
        const user = await User.findOne({where: {email:email}});
        if (!user){
            req.session.error= "Invalid Credentials";
            return res.status(400).redirect('/login');
        }

        //passwordCheck
        const passwordExist = await bcrypt.compare(password, user.password);
        if (!passwordExist){
            req.session.error= "Invalid Credentials";
            return res.status(400).redirect('/login');
        }

        //creating token
        const token = jwt.sign({id: user.id,role:user.role}, process.env.TOKEN_SECRET,{expiresIn: '7d'});

        logger.log({
            level: "info",
            message: "Logged In",
            metadata: {method: req.method, ip, useragent,email}, // Put what you like as meta
        });

        // const users = await LoggedIn.find({message:"Logged In"});

        res.cookie(`token`,token);
        res.status(200).redirect('/logged-logs');

    } catch (e) {
        if (e.errors?.length === 1) {
            req.session.error= e.errors[0].message;
            res.status(400).redirect('/login');
        } else if (e.errors?.length > 1) {
            req.session.error= e.errors.map((x) => x.message);
            res.status(400).redirect('/login');
        } else if (e.message) {
            req.session.error= e.message;
            res.status(400).redirect('/login');
        } else {
            req.session.error= "Could not process the request";
            res.status(400).redirect('/login');
        }
    }
}

const logoutController = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).redirect('/login');
    } catch (e) {
        if (e.errors?.length === 1) {
            res.status(400).json({message: e.errors[0].message});
        } else if (e.errors?.length > 1) {
            res.status(400).json({message: e.errors.map((x) => x.message)});
        } else if (e.message) {
            res.status(400).json({error: e.message});
        } else {
            res.status(400).json({message: "Could not process the request"});
        }
    }
}

module.exports = {
    loggedInController , loginController ,loginViewController,logoutController
}
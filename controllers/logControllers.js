const LoggedIn = require('../models/mongodb/LoggedIn');

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

module.exports = {
    loggedInController
}
const jwt = require('jsonwebtoken');


//token verification
const adminAuth = async (req, res, next) => {

    try {
        let token;
        token = req.cookies.token;

        if (!token) return res.status(401).redirect('/login');
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);

        if (!verified) return res.status(401).redirect('/login');

        if (verified.role !== 'admin') return res.status(401).redirect('/login');

        req.user = verified.id;
        next();

    } catch (err) {
        res.status(400).send({error: err.message});
    }
};

const isLoggedIn = async (req, res, next) => {

    try {
        let token;
        let verified;
        token = req.cookies.token;

        if (token) verified = jwt.verify(token, process.env.TOKEN_SECRET);

        if (verified) return res.redirect('/logged-logs');

        next();

    } catch (err) {
        res.status(400).send({error: err.message});
    }
};


module.exports = {adminAuth, isLoggedIn};
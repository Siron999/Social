const jwt = require('jsonwebtoken');

//token verification
const auth = async (req, res, next) => {

    try {
        let token;
        const header = req.header('authorization');
        if (header) {
            token = header.split(' ')[1];
        }

        if (!token) return res.status(401).json({message: "No Authorization Token, Access Denied"});
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(JSON.stringify(verified) + "asdasdasd");
        if (!verified) return res.status(401).json({message: "Token Verification Failed, Access Denied"});

        req.user = verified.id;
        next();

    } catch (err) {
        res.status(400).send({error: err.message});
    }
};

module.exports = auth;
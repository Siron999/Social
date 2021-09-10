const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize= require('./config/db.js');
const logger= require('./config/logger');
require('./config/mongodb');
require('./models/index.js');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');


//importing rotes
const userRoutes = require('./routes/userRoutes');
const logRoutes = require('./routes/adminRoutes');


dotenv.config();

const app = express();


app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use(cors());
app.use(cookieParser());
app.use(sessions({
    secret: "thisismysecrctekeasdyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 60000 },
    resave: false
}));

app.set('views', 'views');
app.set('view engine', 'ejs');



//setting up routes
app.use('/api/',userRoutes);
app.use('/',logRoutes);

app.get('/',(req,res)=>{
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let useragent = req.headers['user-agent'];
    //checking if user exists or not
    logger.log({
        level: "info",
        message: "Incoming Request",
        metadata: {method: req.method, ip, useragent}, // Put what you like as meta
    });
    res.send('Welcome to Social');
});

const PORT = process.env.PORT || 5000;

sequelize.authenticate().then(() => console.log("Connect with DB")).catch((error) => console.log(error));

app.listen(PORT,()=> console.log(`Server running on PORT: ${PORT}`))



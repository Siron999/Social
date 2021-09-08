const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize= require('./config/db.js');
const logger= require('./config/logger');
require('./models/index.js');

//importing rotes
const userRoutes = require('./routes/userRoutes');


dotenv.config();

const app = express();


app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use(cors());


//setting up routes
app.use('/api/',userRoutes);

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



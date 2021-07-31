const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

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

    res.send('Welcome to Social');
});

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=> console.log(`Server running on PORT: ${PORT}`))



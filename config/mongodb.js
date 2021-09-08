const mongoose = require('mongoose');

const mongodb=mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to Mongo DB")).catch((e) => console.log(e.message));

module.exports = mongodb;
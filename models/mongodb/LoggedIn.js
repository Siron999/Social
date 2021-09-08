const mongoose = require('mongoose');

const loggedInSchema= mongoose.Schema({
    level:{
        type: String,
        required: true,
        max: 255,

    },
    message:{
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    meta:{
        type: Object,
        required: true,
        min: 6,
        max: 1024,
    },
    timestamp :{
        type: Date,
    }

});

const LoggedIn=mongoose.model('Log',loggedInSchema);

module.exports = LoggedIn;
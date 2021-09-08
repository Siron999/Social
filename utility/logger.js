const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'logFile.log',
            level: 'info',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        }),
        new winston.transports.MongoDB({
            db: 'mongodb+srv://siron:abcde12345@cluster0.dw0ms.mongodb.net/<dbname>?retryWrites=true&w=majority',
            level: 'info',
            collection:'logs'
        }),
    ],
});

module.exports = logger;
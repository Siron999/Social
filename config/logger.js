const winston = require('winston');
const dotenv = require('dotenv');
require('winston-mongodb');

dotenv.config();

const logger = winston.createLogger({
    transports: [
        new winston.transports.MongoDB({
            db: process.env.CONNECTION_URL,
            level: 'info',
            collection:'logs'
        }),
    ],
});

module.exports = logger;
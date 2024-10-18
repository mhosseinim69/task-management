const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'combined.log'
        })
    ],
});

logger.exceptions.handle(
    new winston.transports.File({
        filename: 'exceptions.log'
    })
);

logger.rejections.handle(
    new winston.transports.File({
        filename: 'rejections.log'
    })
);

module.exports = logger;
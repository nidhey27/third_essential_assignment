// const winston = require("winston");

// const logger = winston.createLogger({
//   level: "info",
//   format: winston.format.json(),
//   transports: [
//     //
//     // - Write all logs with level `error` and below to `error.log`
//     // - Write all logs with level `info` and below to `combined.log`
//     //
//     new winston.transports.File({ filename: "error.log", level: "error" }),
//     new winston.transports.File({ filename: "combined.log" }),
//   ],
// });

// module.exports = logger
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
 
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});
 
const logger = createLogger({
  format: combine(
    timestamp({ format: "DD-MM-YY HH:mm:ss" }),
    myFormat
  ),
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log", level: "info" }),
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
  })
  ]
});
logger.stream = {
  write: function(message, encoding){
      logger.info(message);
  }
};

module.exports = logger
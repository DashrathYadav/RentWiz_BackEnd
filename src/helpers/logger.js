const { createLogger, transports, format } = require("winston");
const { combine, timestamp, printf } = format;
const DailyRotateFile = require("winston-daily-rotate-file");

// Define a custom format for the log messages
const logFormat = printf(({ timestamp, level, message }) => {
    return `${timestamp} ${level}: ${message}`;
});

// Create a logger instance
const logger = createLogger({
    format: combine(
        timestamp(), // Add a timestamp to log entries
        logFormat
    ),
    transports: [
        new DailyRotateFile({
            filename: "errorLogs/error-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
            level: "error", // Log only error messages to daily files
        }),
    ],
});

module.exports = logger;

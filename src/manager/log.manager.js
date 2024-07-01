const LogData = require("../dataLayer/log.data");

const logData = new LogData();

/**
 * Log Manager.
 */
class LogManager {
    /**
     * Generate Common API log.
     * @param {model} requestParameter.validators
     * @returns {Object}
     */
    async generateAPILog(req, res, message, hasError) {
        try {
            const response = await logData.generateLog(req, res, message, hasError);
            let result;
            if (response && response.length > 0) {
                result = response[0];
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = LogManager;

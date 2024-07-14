
const CommonData = require("../dataLayer/common.data.js");
const LogManager = require("./log.manager.js");
const logger = require("../helpers/logger.js");

const commonData = new CommonData();
const logManager = new LogManager();










class CommonManager {

    /**
     * Get User Info.
     * @returns {Object}
     */
    async getUserInfo(userId) {
        try {
            var userModel = {};
            const userRes = await commonData.getUserInfo(userId);
            if (userRes.length > 0) {
                userModel = userRes[0];
            }
            return userModel;
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            logger.error(errorLog);
            logManager.generateAPILog(req, "", errorLog, 1);
            throw error;
        }
    }
}

module.exports = CommonManager;


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
    async getUserInfo(req) {
        try {
            var userModel = {};
            const userRes = await commonData.getUserInfo(req);
            if (userRes.length > 0) {
                userModel = userRes[0];
            }
            return userModel;
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            logger.error(errorLog);
            logManager.generateAPILog(req, "", errorLog, 1);
        }
    }


    
    async getProperty(req) {
        try {
            var userModel = {};
            const userRes = await commonData.getProperty(req);
            if (userRes.length > 0) {
                userModel = userRes[0];
            }
            return userModel;
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            logger.error(errorLog);
            logManager.generateAPILog(req, "", errorLog, 1);
        }
    }


}

module.exports = CommonManager;

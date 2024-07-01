const db = require("../../config/database.js");

/**
 * Log Data.
 */
class LogData {
    /**
     * Generate Request Response and Error Log in Database.
     */
    async generateLog(req, res, message, hasError) {
        let controllerName = req.baseUrl.replace("/api/", "");
        let routeName = req.originalUrl;
        let requestFrom = req.body.deviceType || 1;
        let inputParameters = JSON.stringify(req.body);
        let outputParameters = res != "" ? JSON.stringify(res) : "";
        const procedureName = "usp_InOutParameterLog";
        try {
            const result = await db.query(
                `CALL ${procedureName}(:controllerName, :routeName, :inputParameters, :outputParameters, :requestFrom, :message, :hasError)`,
                {
                    replacements: {
                        controllerName,
                        routeName,
                        inputParameters,
                        outputParameters,
                        requestFrom,
                        message,
                        hasError,
                    },
                    type: db.QueryTypes.RAW,
                }
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = LogData;

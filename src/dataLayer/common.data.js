



const { log } = require("winston");
const db = require("../../config/database.js");
require('dotenv').config();




const  axios=require("axios");



class CommonData {



    /**
    * Get UserInfo.
    * @returns {Object}
    */
    async getUserInfo(req) {
        const id = req.user.userID;
        const procedureName = "usp_GetUserInfo";
        try {
            const user = await db.query(
                `CALL ${procedureName}(:id)`,
                {
                    replacements: { id },
                    type: db.QueryTypes.RAW,
                }
            );
            return user;
        } catch (error) {
            throw error;
        }
    }


}

module.exports = CommonData;
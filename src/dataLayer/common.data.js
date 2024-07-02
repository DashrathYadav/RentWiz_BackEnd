



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
        const body=req.body.userID;
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
    async getProperty(req) {
        const id = req.user.userID;

        const propty1=req.body.propty1;
        const propty2=req.body.propty2;

        const procedureName = "insertProperty";
        try {
            const response = await db.query(
                `CALL ${procedureName}(:propty1,:propty2,:id)`,
                {
                    replacements: { propty1,propty2,id },
                    type: db.QueryTypes.RAW,
                }
            );
            return response;
        } catch (error) {
            throw error;
        }
    }


}

module.exports = CommonData;
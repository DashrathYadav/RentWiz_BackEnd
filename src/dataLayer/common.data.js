



const { log } = require("winston");
const db = require("../../config/database.js");
require('dotenv').config();
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const { emailConst } = require("../helpers/constants");
const mailer = require("../helpers/mailer.js");

const  axios=require("axios");



class CommonData {



    /**
    * Get UserInfo.
    * @returns {Object}
    */
    async getUserInfo(req) {
        const id = req.user.userID;
        // const body=req.body.userID;
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



    //Common function for Email
    async applicationEmail(req) {

        try{
        const fileName = req.fileName || '';
        const subject = req.subject || '';
        const otp = req.otp;
        
            const data = {
                otp: otp
  
            };

            const email = "anuragyou4@gmail.com";
            const ejsFilePath = path.join(process.cwd(), "src", "emailTemplates", fileName);
            const ejsContent = fs.readFileSync(ejsFilePath, "utf8");
            const html = ejs.render(ejsContent, data);
            const mailsend = mailer.send(
                emailConst.confirmEmails.from,
                email,
                subject,
                html
            );
            console.log("done")
            if (mailsend) {
                console.log("Mail Successfully Sent!");
            } else {
                console.log("Error while sending mail");
            }

            return resultMail;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = CommonData;
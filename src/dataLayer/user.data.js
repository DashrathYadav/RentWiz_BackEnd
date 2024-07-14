const db = require("../../config/database");
const Table = require("../helpers/CONSTANTS/tableNameConst");
const {user,address} = require("../../models");

class UserData {

    //get user Profile/Info
    async getUserById(userId) {
        try {
            return  await user.findOne({
                where: {
                    userId: userId,
                },
                attributes: {
                    exclude: ["password", "newPassword"],
                },
                include :{
                    model: "Address",
                }
            });
        } catch (error) {
            throw error;
        }
    }
}
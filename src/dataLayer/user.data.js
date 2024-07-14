const db = require("../../config/database");
const Table = require("../helpers/CONSTANTS/tableNameConst");
const {user,address} = require("../../models");

class UserData {

    //get user Profile/Info
    async getUserInfo(userId) {
        try {
            const user = await user.findOne({
                where: {
                    userId: userId,
                },
                attributes: {
                    exclude: ["password", "newPassword"],
                },
                include :{
                    model: address,
                }
            });
            return user;
        } catch (error) {
            throw error;
        }
    }
}
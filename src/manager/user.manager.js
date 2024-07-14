
const {UserData} = require("../dataLayer/user.data");
const apiResponse = require("../helpers/apiResponse");
const userData = new UserData();

class UserManager {

    /**
     * Get user profile
     * @returns {Object}
     * @param userId
     */
    async getProfile(userId) {
        try {
            let usersRes = null;
            usersRes = await userData.getUserById(userId);
            return ( usersRes != null && usersRes.length > 0) ? usersRes[0] : null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { UserManager };
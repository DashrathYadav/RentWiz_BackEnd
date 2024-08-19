const UserData = require("../dataLayer/user.data");
const {logError} = require("../helpers/utility");
const userData = new UserData();
const AddressManager = require("./address.manager");
const addressManager = new AddressManager();

class UserManager {

    /**
     * Get user profile
     * @returns {Object}
     * @param userId
     */
    async getUserById(userId) {
        try {
            //sanitizing the input
            if (userId <= 0 || userId == null || userId === "" || isNaN(userId)) {
                return null;
            }

            return await userData.getUserById(userId);

        } catch (error) {
            throw error;
        }
    }

    async getAllUserAndPaginationMetaData(paginationData) {
        try {
            let usersAndPaginationMetaData = await userData.getAllUserAndPaginationMetaData(paginationData);
            return usersAndPaginationMetaData != null || usersAndPaginationMetaData !== undefined ? usersAndPaginationMetaData : null;
        } catch (error) {
            logError(error);
            throw error;
        }
    }

    async createUser(user) {
        try {
            // Check if the user object is valid
            if (!user || user === "" || user === undefined) {
                return null;
            }

            // Create the user using the data layer method
            // Return the created user if successful, else null
            return await userData.createUser(user);

        } catch (error) {
            // Log the error for debugging purposes
            logError(error);
            throw error;  // Re-throw the error to be handled by the caller
        }
    }

    async updateUser(user) {
        try {
            //sanitizing the input
            if (user == null || user === "" || user === undefined) {
                return null;
            }
            return await userData.updateUser(user);

        } catch (error) {
            logError(error);
            throw error;
        }
    }

    async deActivateUserById(userId) {
        try {
            //sanitizing the input
            if (userId <= 0 || userId == null || userId === "" || isNaN(userId)) {
                return null;
            }
            return await userData.deActivateUserById(userId);

        } catch (error) {
            logError(error);
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            //sanitizing the input
            if (email == null || email === "" || email === undefined) {
                return null;
            }
            return await userData.getUserByEmail(email);

        } catch (error) {
            logError(error);
            throw error;
        }
    }

    async getUserByMobileNumber(mobileNumber) {
        try {
            //sanitizing the input
            if (mobileNumber == null || mobileNumber === "" || mobileNumber === undefined) {
                return null;
            }
            return await userData.getUserByMobileNumber(mobileNumber);

        } catch (error) {
            logError(error);
            throw error;
        }
    }

    async getUserByLoginId(loginId) {
        try {
            //sanitizing the input
            if (loginId == null || loginId === "" || loginId === undefined) {
                return null;
            }
            return userData.getUserByLoginId(loginId);
        } catch (error) {
            logError(error);
            throw error;
        }
    }

    async getUserProfile(userId) {
        try {
            //sanitizing the input
            if (userId <= 0 || userId == null || userId === "" || isNaN(userId)) {
                return null;
            }
            let userProfile= null;
            const user= await userData.getUserById(userId);
            if(user) {
                userProfile = {user: user};
                const address = await addressManager.getAddressById(user.addressId);
                if (address) {
                    userProfile.address = address;
                }
            }

            return userProfile;

        } catch (error) {
            logError(error);
            throw error;
        }
    }
}
module.exports = UserManager ;
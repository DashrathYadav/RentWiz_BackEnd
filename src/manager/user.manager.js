const UserData = require("../dataLayer/user.data");
const {logError} = require("../helpers/utility");
const userData = new UserData();
const PropertyManager = require("./property.manager");
const AddressManager = require("./address.manager");
const securePassword = require("../helpers/securePassword");
const logger = require("../helpers/logger");
const LogManager = require("./log.manager");
const propertyManager = new PropertyManager();
const addressManager = new AddressManager();
const logManager = new LogManager();

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
            let userProfile = null;
            const user = await userData.getUserById(userId);
            if (user) {
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

    async getAllPropertiesPaginated(userId, paginationData) {
        try {
            //sanitizing the input
            if (userId <= 0 || userId == null || userId === "" || isNaN(userId)) {
                return null;
            }
            return await propertyManager.getAllPropertiesOfUserPaginated(userId, paginationData);
        } catch (error) {
            logError(error);
            throw error;
        }
    }

    async handleCreateUser(req) {
        try {
            const user = req.body.user;
            const address = req.body.address;

            //sanitizing the input.
            if (user == null || user === "" || user === undefined) {
                return {
                    status: 400,
                    message: "Invalid user data",
                };
            }

            if (address == null || address === "" || address === undefined) {
                return {
                    status: 400,
                    message: "Invalid address data",
                };
            }

            //check if user already exists for given login ID
            let userResult = null;
            userResult = await this.getUserByLoginId(user.loginId);
            if (userResult != null) {
                return {
                    status: 400,
                    message: "User already exists with this login ID",
                };
            }

            //check if user already exists for given email ID
            userResult = await this.getUserByEmail(user.email);
            if (userResult != null) {
                return {
                    status: 400,
                    message: "User already exists with this email ID",
                };
            }

            //check if user already exists for given mobile number
            userResult = await this.getUserByMobileNumber(user.mobileNumber);
            if (userResult != null) {
                return {
                    status: 400,
                    message: "User already exists with this mobile number",
                };
            }

            //hash the password
            const hashedPassword = await securePassword(user.password);

            // Address creation
            const newAddress = {
                street: address.street,
                landMark: address.landMark,
                area: address.area,
                cityId: address.cityId,
                pincode: address.pincode,
                stateId: address.stateId,
                countryId: address.countryId,
            };

            //save address in database and get the address data;
            let addressResult = await addressManager.createAddress(newAddress);
            const newCreatedAddressId = addressResult.addressId;
            //If address not created then return error
            if (newCreatedAddressId == null) {
                return {
                    status: 400,
                    message: "Failed to create address",
                };
            }

            //create new user
            let newUser = {
                loginId: user.loginId,
                password: hashedPassword,
                fullName: user.fullName,
                mobileNumber: user.mobileNumber,
                phoneNumber: user.phoneNumber,
                email: user.email,
                aadharNumber: user.aadharNumber,
                //save picture in some online storage and save the link here
                profilePic: user.profilePic,
                //save document in some online storage and save the link here
                document: user.document,
                // create a address and store the address id here
                addressId: newCreatedAddressId,
                roleId: user.roleId,
                note: user.note,
                isActive: true,
                createdBy: 1,
                lastModifiedBy: 1,
                creationDate: new Date(),
                lastModifiedDate: new Date(),
            };

            //save user in database and get the user data;
            const newCreateduser = await this.createUser(newUser);
            if (newCreateduser) {
                return {
                    status: 201,
                    message: "User created",
                    data: newCreateduser,
                };
            } else {
                return {
                    status: 500,
                    message: "Internal server error",
                };
            }
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            logger.error(errorLog);
            await logManager.generateAPILog(req, "", errorLog, 1);
            throw error;
        }
    }
}
module.exports = UserManager ;
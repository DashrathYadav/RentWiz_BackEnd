const db = require("../../config/database");
const Table = require("../helpers/CONSTANTS/tableNameConst");
const { User } = require('../../models');
const { Op } = require('sequelize');

class UserData {


    async getUserById(userId) {
        try {
            return (await User.findOne({
                where: {
                    userId: userId
                }
            }))?.toJSON();
        } catch (error) {
            throw error;
        }
    }

    async  getAllUser(pageNumber, pageSize, filterContains, filterStartsWith) {
        try {
            // Validate and log parameters
            pageNumber = parseInt(pageNumber, 10);
            pageSize = parseInt(pageSize, 10);

            if (isNaN(pageNumber) || isNaN(pageSize)) {
                throw new Error('Invalid pagination parameters');
            }

            console.log('Pagination - Page:', pageNumber, 'Size:', pageSize);
            console.log('Filter Contains:', filterContains);

            // Run query
            const users = await User.findAll({
                limit: pageSize,
                offset: (pageNumber - 1) * pageSize,
                where: {
                    [Op.or]: [
                        {fullName: {[Op.like]: `%${filterContains}%`}},
                        {email: {[Op.like]: `%${filterContains}%`}},
                        {mobileNumber: {[Op.like]: `%${filterContains}%`}},
                        {loginId: {[Op.like]: `%${filterContains}%`}}
                    ]
                }
            });

            return users;
        } catch (error) {
            console.error('Error in getAllUser:', error);
            throw error;
        }
    }

    async createUser(user) {
        try {
            return (await User.create(user))?.toJSON();
        } catch (error) {
            throw error;
        }
    }

    async updateUser(user) {
        try {
            return await user.update(user, {
                where: {
                    userId: user.userId
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(userId) {
        try {
            return await User.destroy({
                where: {
                    userId: userId
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            return (await User.findOne({
                where: {
                    email: email
                }
            }))?.toJSON();
        } catch (error) {
            throw error;
        }
    }

    async getUserByMobileNumber(mobileNumber) {
        try {
            return (await User.findOne({
                where: {
                    mobileNumber: mobileNumber
                }
            }))?.toJSON();
        } catch (error) {
            throw error;
        }
    }

    async getUserByLoginId(loginId) {
        try {
            return (await User.findOne({
                where: {
                    loginId: loginId
                }
            }))?.toJSON();
        } catch (error) {
            throw error;
        }
    }
}

module.exports =  UserData ;
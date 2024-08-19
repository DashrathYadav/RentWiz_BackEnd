const { User } = require('../../models');
const { getSanitizedPaginationAndFilterCondition, getPaginationMetaData} = require("../helpers/utility");

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

    async  getAllUserAndPaginationMetaData(paginationData) {
        try {

            // Get pagination and filter
            const {
                _pageSize,
                _pageNumber,
                _condition,
                _orderBy
            } = getSanitizedPaginationAndFilterCondition(paginationData);

            // Set default orderByField if not provided
            const _orderByField = paginationData.orderByField || 'userId';

            // Run query
            const result = await User.findAndCountAll({
                where: _condition,
                limit: _pageSize,
                offset: (_pageNumber - 1) * _pageSize,
                order: [[_orderByField, _orderBy]]
            });

            return {
                users: result.rows,
                paginationMetaData: getPaginationMetaData(result, _pageSize, _pageNumber),
            };

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

    async deActivateUserById(userId, modifiedBy) {
        try {
            return await User.update({
                isActive: false,
                lastModifiedBy:modifiedBy,
                lastModificationdDate: new Date(),
            }, {
                where: {
                    userId: userId
                }
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports =  UserData ;
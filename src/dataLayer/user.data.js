const db = require("../../config/database");
const Table = require("../helpers/CONSTANTS/tableNameConst");
const { User } = require('../../models');
const { Op } = require('sequelize');
const { getPaginationAndFilter } = require("../helpers/utility");

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

    async  getAllUserAndPaginationMetaData(pageNumber, pageSize, filterContains, filterStartsWith,filterFields,orderBy,orderByField) {
        try {

            // Get pagination and filter
            const {_pageSize,_pageNumber,_condition,_orderBy} = getPaginationAndFilter({
                pageNumber: pageNumber,
                pageSize: pageSize,
                filterContains: filterContains,
                filterStartsWith: filterStartsWith,
                filterFields: filterFields,
                orderBy: orderBy,
            });

            // Set default orderByField if not provided
            const _orderByField = orderByField || 'userId';

            // Run query
            const result = await User.findAndCountAll({
                where: _condition,
                limit: _pageSize,
                offset: (_pageNumber - 1) * _pageSize,
                order: [[_orderByField, _orderBy]]
            });

            return {
                users: result.rows,
                totalItems: result.count,
                totalPages: Math.ceil(result.count / _pageSize),
                currentPage:_pageNumber,
                pageSize: _pageSize,
                filterContains: filterContains
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
}

module.exports =  UserData ;
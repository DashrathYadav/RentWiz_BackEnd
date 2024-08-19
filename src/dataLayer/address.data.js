const db = require("../../config/database");
const Table = require("../helpers/CONSTANTS/tableNameConst");
const { Address } = require('../../models');

/**
 * Address Data.
 */
class AddressData {
  /**
   * Get Address by Id.
   * @returns {Object}
   * @param addressId
   */
  async getAddressById(addressId) {
    //use sql query to get address by id
    try {
      return (await Address.findOne({
          where: {
              addressId: addressId,
          },
      })).toJSON();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create Address.
   * @param {Object} address
   * @returns {Object}
   */
  async createAddress(address) {
    //use sql query to create address
    try {

      return (await Address.create(address)).toJSON();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update Address.
   * @param {Object} address
   * @returns {Object}
   */
  async updateAddress(address) {
    //use sql query to update address
    try {
      const {addressId, street, landMark, area, cityId, pincode, stateId, countryId} =
          address;
      return await db.query(
          `UPDATE ${Table.ADDRESS} SET street = :street, landMark = :landMark, area = :area, cityId = :cityId, pincode = :pincode, stateId = :stateId, countryId = :countryId WHERE addressId = :addressId`,
          {
            replacements: {
              addressId,
              street,
              landMark,
              area,
              cityId,
              pincode,
              stateId,
              countryId,
            },
            type: db.QueryTypes.UPDATE,
          }
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AddressData;

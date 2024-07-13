const db = require("../../config/database");
const Table = require("../helpers/CONSTANTS/tableNameConst");

/**
 * Address Data.
 */
class AddressData {
  /**
   * Get Address by Id.
   * @param {Number} id
   * @returns {Object}
   */
  async getAddressById(id) {
    //use sql query to get address by id
    try {
      const address = await db.query(
        `SELECT * FROM ${Table.ADDRESS} WHERE id = :id`,
        {
          replacements: { id },
          type: db.QueryTypes.SELECT,
        }
      );
      return address;
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
      const { street, landMark, area, cityId, pincode, stateId, countryId } =
        address;
      const result = await db.query(
        `INSERT INTO ${Table.ADDRESS} (street, landMark, area, cityId, pincode, stateId, countryId) VALUES (:street, :landMark, :area, :cityId, :pincode, :stateId, :countryId)`,
        {
          replacements: {
            street,
            landMark,
            area,
            cityId,
            pincode,
            stateId,
            countryId,
          },
          type: db.QueryTypes.INSERT,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AddressData;

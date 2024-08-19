const AddressData = require("../dataLayer/address.data");
const apiResponse = require("../helpers/apiResponse");
const addressData = new AddressData();

class AddressManager {

        async getAddressById(addressId) {
            try {
                //sanitizing the input
                if(addressId <= 0 || addressId == null || addressId === "" || isNaN(addressId)) {
                    return null;
                }

                return await addressData.getAddressById(addressId);
            } catch (error) {
                throw error;
            }
        }

        async createAddress(address) {
            try {
                //sanitizing the input
                if (address == null || address === "" || address === undefined) {
                    return null;
                }

                return await addressData.createAddress(address);
            } catch (error) {
                throw error;
            }
        }

        async updateAddress(address) {
            try {
                //sanitizing the input
                if(address == null || address === "" || address === undefined ) {
                    return null;
                }
                
                let addressRes = null;
                addressRes = await addressData.updateAddress(address);
                return ( addressRes != null && addressRes.length > 0) ? addressRes[0] : null;
            } catch (error) {
                throw error;
            }
        }
}

module.exports = AddressManager;
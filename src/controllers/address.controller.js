/*
2. Address
1. getAddressById(addressId)
2. createAddress(address)
3. updateAddress(address)
 */

const apiResponse = require("../helpers/apiResponse.js");
const { AddressManager } = require("../manager/address.manager.js");
const addressManager = new AddressManager();
class AddressController {

    /**
     * Get Address
     * @param req
     * @param res
     * @response: if success then return Address Record
     */
    async getAddressById(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            const addressId = req.params.addressId;
            if (addressId <= 0 || addressId == null || addressId === "" || isNaN(addressId)) {
                return apiResponse.validationErrorWithData(res, "Invalid address id.", {addressId: addressId});
            }
            const address = await addressManager.getAddress(addressId);
            if (address != null && address.addressID > 0) {
                return apiResponse.successResponseWithData(
                    res,
                    "Get address: success.",
                    address
                );
            } else {
                return apiResponse.notFoundResponse(
                    res,
                    "Address not found."
                )
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }

    async createAddress(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            const address = req.body.address;
            if (address == null || address === "") {
                return apiResponse.validationErrorWithData(res, "Invalid address.", {address: address});
            }
            const result = await addressManager.createAddress(req.body);
            if (result != null && result.addressID > 0) {
                return apiResponse.successResponseWithData(
                    res,
                    "Create address: success.",
                    result
                );
            } else {
                return apiResponse.notAcceptableRequest(
                    res,
                    "Address not created."
                )
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }

    async updateAddress(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            const address = req.body.address;
            if (address == null || address === "") {
                return apiResponse.validationErrorWithData(res, "Invalid address.", {address: address});
            }
            const result = await addressManager.updateAddress(address);
            if (result != null && result.addressID > 0) {
                return apiResponse.successResponseWithData(
                    res,
                    "Update address: success.",
                    result
                );
            } else {
                return apiResponse.notAcceptableRequest(
                    res,
                    "Address not updated."
                )
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }
}
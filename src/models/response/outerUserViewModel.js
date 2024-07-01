/**
 * User View Model.
 */
class OutUserViewModel {
    constructor(data) {
        data = data || {};

        /** @type {number} */
        this.userID = data.userID || 0;

        /** @type {string} */
        this.firstName = data.firstName || "";

        /** @type {string} */
        this.lastName = data.lastName || "";

        /** @type {string} */
        this.email = data.email || "";

        /** @type {string} */
        this.mobileNumber = data.mobileNumber || "";

        /** @type {boolean} */
        this.isConfirm = data.isConfirm || false;

        /** @type {boolean} */
        this.isActive = data.isActive || false;
    }
}

module.exports = OutUserViewModel;

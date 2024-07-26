/* Mail Constants for mail sending Process */
exports.emailConst = {
    admin: {
        name: "Admin",
        email: "nodeaha@gmail.com",
    },
    confirmEmails: {
        from: "nodeaha@gmail.com",
    },
};

/**
 * Device Type Constant
 */
exports.deviceType = {  
    Web: 1,
    Android: 2,
    iOs: 3,
};

/**
 * Action Type Constant
 */
exports.actionType = {
    Insert: 1,
    Update: 2,
    ActiveInActive: 3,
    Delete: 4
    
};

exports.tokenKey = "x-access-token";

exports.maxPageSize = 100;

exports.defaultPageSize = 10;

exports.defaultPageNumber = 1;

exports.Order = function getOrderMap(){
    let orderMap = new Map();
    orderMap.set('asc', 'ASC');
    orderMap.set('desc', 'DESC');
    return orderMap;
}();
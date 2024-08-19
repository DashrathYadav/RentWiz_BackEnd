class ClientError extends Error {
    constructor(message, statusCode = 400, data = null) {
        super(message);
        this.name = "ClientError";
        this.statusCode = statusCode; // HTTP status code
        this.data = data;
    }
}

class ServerError extends Error {
    constructor(message, statusCode = 500, data = null) {
        super(message);
        this.name = "ServerError";
        this.statusCode = statusCode; // HTTP status code
        this.data = data;
    }
}

module.exports = { ClientError, ServerError };
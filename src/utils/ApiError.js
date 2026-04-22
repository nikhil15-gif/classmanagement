/**
 * Custom error class for API errors.
 * Extends the built-in Error class to include an HTTP status code
 * and an array of specific error messages if needed (e.g., validation errors).
 */
class ApiError extends Error {
    constructor(statusCode, message, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.isOperational = true; // Indicates it's a known error, not a bug

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;

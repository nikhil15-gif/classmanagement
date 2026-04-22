const ApiError = require('../utils/ApiError');

/**
 * Global Error Handler Middleware
 * Catches all errors thrown in the application and formats them into a consistent JSON structure.
 */
const errorHandlerMiddleware = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log error for developers
    console.error(`[Error] ${err}`);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new ApiError(404, message);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ApiError(400, message);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((val) => val.message);
        error = new ApiError(400, 'Validation Error', messages);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error',
        errors: error.errors || []
    });
};

module.exports = errorHandlerMiddleware;

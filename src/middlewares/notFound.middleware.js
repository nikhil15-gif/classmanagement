/**
 * Not Found Middleware
 * Catch-all route for any unhandled endpoint and throws a 404 error.
 */
const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Not Found - ${req.originalUrl}`
    });
};

module.exports = notFoundMiddleware;

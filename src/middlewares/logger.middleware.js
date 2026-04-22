/**
 * Logger Middleware
 * Logs the HTTP method, the requested URL, and the current timestamp for every incoming request.
 */
const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
};

module.exports = loggerMiddleware;

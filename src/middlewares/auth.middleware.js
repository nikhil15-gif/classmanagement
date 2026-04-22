const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model');

/**
 * Middleware to protect routes.
 * Checks for a valid JWT in the Authorization header.
 */
const protect = async (req, res, next) => {
    let token;

    // Check if header exists and starts with Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (Format: "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token payload and attach to request object
            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user) {
                return next(new ApiError(401, 'User associated with this token no longer exists.'));
            }

            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error.message);
            // Distinguish between expired and invalid tokens
            if (error.name === 'TokenExpiredError') {
                return next(new ApiError(401, 'Not authorized, token expired'));
            }
            return next(new ApiError(401, 'Not authorized, token failed'));
        }
    }

    if (!token) {
        return next(new ApiError(401, 'Not authorized, no token provided'));
    }
};

/**
 * Optional middleware to restrict routes to specific roles
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, `User role ${req.user.role} is not authorized to access this route`));
        }
        next();
    };
};

module.exports = { protect, authorize };

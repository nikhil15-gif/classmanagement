const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

/**
 * Helper to generate JWT token
 */
const generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

class AuthService {
    /**
     * Register a new user
     */
    static async registerUser(userData) {
        const { name, email, password } = userData;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new ApiError(400, 'User already exists with this email');
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password
        });

        // Generate token
        const token = generateToken(user._id, user.email);

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        };
    }

    /**
     * Login user
     */
    static async loginUser(email, password) {
        // Check for user email. We select password because it's excluded by default in the model.
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            throw new ApiError(401, 'Invalid credentials');
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            throw new ApiError(401, 'Invalid credentials');
        }

        // Generate token
        const token = generateToken(user._id, user.email);

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        };
    }
}

module.exports = AuthService;

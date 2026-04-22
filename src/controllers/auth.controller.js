const AuthService = require('../services/auth.service');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

class AuthController {
    /**
     * @route   POST /api/auth/register
     * @desc    Register user
     * @access  Public
     */
    static async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            
            if (!name || !email || !password) {
                return next(new ApiError(400, 'Please provide name, email and password'));
            }

            const result = await AuthService.registerUser(req.body);
            res.status(201).json(new ApiResponse(201, result, 'User registered successfully'));
        } catch (error) {
            next(error);
        }
    }

    /**
     * @route   POST /api/auth/login
     * @desc    Login user
     * @access  Public
     */
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return next(new ApiError(400, 'Please provide an email and password'));
            }

            const result = await AuthService.loginUser(email, password);
            res.status(200).json(new ApiResponse(200, result, 'User logged in successfully'));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;

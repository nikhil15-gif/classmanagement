const ApiError = require('../utils/ApiError');

/**
 * Validation Middleware
 * Validates the basic required fields for creating/updating a student.
 * If validation fails, passes an ApiError to the global error handler.
 */
const validateStudent = (req, res, next) => {
    const { name, age, course } = req.body;
    const errors = [];

    if (name !== undefined && (typeof name !== 'string' || name.trim().length < 2)) {
        errors.push('Name must be a string with at least 2 characters.');
    }
    if (age !== undefined && (typeof age !== 'number' || age < 5 || age > 100)) {
        errors.push('Age must be a number between 5 and 100.');
    }
    if (course !== undefined && (typeof course !== 'string' || course.trim().length === 0)) {
        errors.push('Course is required and must be a string.');
    }

    if (errors.length > 0) {
        return next(new ApiError(400, 'Validation failed', errors));
    }

    next();
};

module.exports = validateStudent;

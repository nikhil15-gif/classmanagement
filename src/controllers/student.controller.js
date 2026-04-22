const StudentService = require('../services/student.service');
const ApiResponse = require('../utils/ApiResponse');

/**
 * Controller for handling student routes
 * Maps HTTP requests to Service functions and formats responses
 */
class StudentController {
    /**
     * @route   POST /api/students
     * @desc    Create a student
     * @access  Public
     */
    static async createStudent(req, res, next) {
        try {
            const student = await StudentService.createStudent(req.body);
            res.status(201).json(new ApiResponse(201, student, 'Student created successfully'));
        } catch (error) {
            next(error); // Passes to error handler middleware
        }
    }

    /**
     * @route   GET /api/students
     * @desc    Get all students (with pagination and search)
     * @access  Public
     */
    static async getAllStudents(req, res, next) {
        try {
            const { page, limit, search, sort } = req.query;
            const result = await StudentService.getAllStudents({ page, limit, search, sort });
            res.status(200).json(new ApiResponse(200, result, 'Students retrieved successfully'));
        } catch (error) {
            next(error);
        }
    }

    /**
     * @route   GET /api/students/:id
     * @desc    Get student by ID
     * @access  Public
     */
    static async getStudentById(req, res, next) {
        try {
            const student = await StudentService.getStudentById(req.params.id);
            res.status(200).json(new ApiResponse(200, student, 'Student retrieved successfully'));
        } catch (error) {
            next(error);
        }
    }

    /**
     * @route   PUT /api/students/:id
     * @desc    Update student
     * @access  Public
     */
    static async updateStudent(req, res, next) {
        try {
            const student = await StudentService.updateStudent(req.params.id, req.body);
            res.status(200).json(new ApiResponse(200, student, 'Student updated successfully'));
        } catch (error) {
            next(error);
        }
    }

    /**
     * @route   DELETE /api/students/:id
     * @desc    Delete student
     * @access  Public
     */
    static async deleteStudent(req, res, next) {
        try {
            await StudentService.deleteStudent(req.params.id);
            res.status(200).json(new ApiResponse(200, {}, 'Student deleted successfully'));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = StudentController;

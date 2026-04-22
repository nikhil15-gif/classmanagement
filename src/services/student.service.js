const Student = require('../models/student.model');
const ApiError = require('../utils/ApiError');

/**
 * Service to handle business logic for students
 */
class StudentService {
    /**
     * Creates a new student in the database
     * @param {Object} studentData 
     * @returns {Object} the created student
     */
    static async createStudent(studentData) {
        const student = new Student(studentData);
        await student.save();
        return student;
    }

    /**
     * Gets all students with pagination and search
     * @param {Object} queryOptions 
     * @returns {Object} paginated students and metadata
     */
    static async getAllStudents({ page = 1, limit = 10, search = '', sort = '-createdAt' }) {
        const query = {};
        
        // Search by name (case-insensitive)
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const skip = (page - 1) * limit;

        const students = await Student.find(query)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Student.countDocuments(query);

        return {
            students,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit)
        };
    }

    /**
     * Gets a single student by their ObjectId
     * @param {String} id 
     * @returns {Object} student
     */
    static async getStudentById(id) {
        const student = await Student.findById(id);
        if (!student) {
            throw new ApiError(404, `Student not found with id of ${id}`);
        }
        return student;
    }

    /**
     * Updates a student
     * @param {String} id 
     * @param {Object} updateData 
     * @returns {Object} updated student
     */
    static async updateStudent(id, updateData) {
        const student = await Student.findByIdAndUpdate(id, updateData, {
            new: true, // Return the modified document rather than the original
            runValidators: true // Validate the update operation against the model's schema
        });

        if (!student) {
            throw new ApiError(404, `Student not found with id of ${id}`);
        }

        return student;
    }

    /**
     * Deletes a student
     * @param {String} id 
     * @returns {Object} deleted student
     */
    static async deleteStudent(id) {
        const student = await Student.findByIdAndDelete(id);
        
        if (!student) {
            throw new ApiError(404, `Student not found with id of ${id}`);
        }

        return student;
    }
}

module.exports = StudentService;

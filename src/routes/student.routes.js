const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/student.controller');
const validateStudent = require('../middlewares/validate.middleware');
const { protect } = require('../middlewares/auth.middleware');

// Apply 'protect' middleware to all student routes
router.use(protect);

// Routes for /api/students
router.route('/')
    .get(StudentController.getAllStudents)
    .post(validateStudent, StudentController.createStudent); // Validate body before creating

router.route('/:id')
    .get(StudentController.getStudentById)
    .put(validateStudent, StudentController.updateStudent) // Validate body before updating
    .delete(StudentController.deleteStudent);

module.exports = router;

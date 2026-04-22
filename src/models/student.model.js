const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Student name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long']
    },
    age: {
        type: Number,
        required: [true, 'Student age is required'],
        min: [5, 'Age must be at least 5'],
        max: [100, 'Age cannot exceed 100']
    },
    course: {
        type: String,
        required: [true, 'Course is required'],
        trim: true
    }
}, {
    timestamps: true // Automatically creates createdAt and updatedAt fields
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

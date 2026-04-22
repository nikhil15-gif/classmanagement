const express = require('express');
const loggerMiddleware = require('./middlewares/logger.middleware');
const errorHandlerMiddleware = require('./middlewares/error.middleware');
const notFoundMiddleware = require('./middlewares/notFound.middleware');
const studentRoutes = require('./routes/student.routes');
const authRoutes = require('./routes/auth.routes');
const cors = require('cors');

const app = express();

// Allow frontend cross-origin requests
app.use(cors({ origin: 'http://localhost:5173' }));

// Body parser middleware to handle JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom logger middleware
app.use(loggerMiddleware);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Catch 404 and forward to error handler
app.use(notFoundMiddleware);

// Global Error Handler Middleware
app.use(errorHandlerMiddleware);

module.exports = app;

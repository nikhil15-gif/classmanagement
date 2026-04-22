const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

// Routes for /api/auth
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;

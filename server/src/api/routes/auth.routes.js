const express = require('express');
const router = express.Router();
const { login, logout, checkSession } = require('../controllers/auth.controller');
const {authenticate, isAuthenticated} = require("../middlewares/userAuth.middleware");

router.post('/login', authenticate, login);
router.get('/logout',logout);
router.get('/check-session', checkSession);

module.exports = router;
const express = require('express');
const router = express.Router();
const controller= require('../controllers/user.controller');
const {authenticate, isAuthenticated} = require("../middlewares/userAuth.middleware");



// likes
router.post('/likes/:userId/:portfolioServiceId', authenticate, controller.addLike);
router.delete('/likes/:userId/:portfolioServiceId',authenticate ,controller.removeLike);


module.exports = router;
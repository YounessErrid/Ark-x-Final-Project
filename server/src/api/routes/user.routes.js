const express = require('express');
const router = express.Router();
const controller= require('../controllers/user.controller');
const {authenticate, isAuthenticated} = require("../middlewares/userAuth.middleware");



// likes
router.post('/likes/:userId/:portfolioServiceId', controller.addLike);
router.delete('/likes/:userId/:portfolioServiceId' ,controller.removeLike);


module.exports = router;
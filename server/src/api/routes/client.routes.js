const express = require('express');
const router = express.Router();
const controller = require('../controllers/client.controller');
const authController = require('../controllers/client/auth.controller');
const {authenticate, isAuthenticated} = require('../middlewares/clientAuth.middleware')

// Auth routes
router.post('/auth/register', authController.register)
router.post('/auth/login',authenticate, authController.login);
router.get('/auth/logout', authController.destroy)
// CRUD routes for Post
router.post('/', controller.create)
router.get('/', controller.viewAll)
router.get('/:id', controller.findOne)
router.put('/:id', isAuthenticated, controller.update)
router.delete('/:id', controller.remove)


module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin.controller');
const {authenticate, isAuthenticated} = require('../middlewares/userAuth.middleware')

// Auth routes
router.post('/auth/register', controller.register)
router.post('/auth/login',authenticate, controller.login);
router.get('/auth/logout', controller.destroy)
// // CRUD routes for Post
// router.post('/', controller.create)
// router.get('/', controller.viewAll)
// router.get('/:id', controller.findOne)
// router.put('/:id', isAuthenticated, controller.update)
// router.delete('/:id', controller.remove)


module.exports = router;
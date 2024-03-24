const express = require('express');
const router = express.Router();
const controller = require('../controllers/agency.controller');
const AgencyauthController = require('../controllers/agencyauth.controller');
const {authenticate, isAuthenticated} = require('../middlewares//agencyauth.middleware');
// Auth routes
router.post('/auth/register', authController.register)
router.post('/auth/login',authenticate, authController.login);
router.get('/auth/logout', authController.destroy)

router.post('/', controller.create)
router.get('/:id', controller.findOne)
router.get('/', controller.viewAll)
router.put('/:id',controller.update)
router.delete('/:id',controller.remove)
module.exports = router;
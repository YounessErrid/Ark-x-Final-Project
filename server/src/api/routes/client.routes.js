const express = require('express');
const router = express.Router();
const controller = require('../controllers/client.controller');

// CRUD routes for Post
router.post('/', controller.create)
router.get('/', controller.viewAll)
router.get('/:id', controller.findOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.remove)

module.exports = router;

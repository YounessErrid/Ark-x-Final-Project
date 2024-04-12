const express = require('express');
const router = express.router();
const controller = require('../controller/portfolioservice.controller');

router.post('/', controller.create)
router.get('/:id', controller.findOne)
router.get('/', controller.viewAll)
router.put('/:id',controller.update)
router.delete('/:id',controller.remove)
module.exports = router;
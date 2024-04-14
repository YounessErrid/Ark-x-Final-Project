const express = require('express');
const router = express.Router();
const controller = require('../controllers/portfolio/portfolio.controller');

router.post('/', controller.create)
router.get('/:id', controller.findOne)
router.get('/', controller.viewAll)
router.put('/:id',controller.update)
router.remove('/:id',controller.remove)
module.exports = router;
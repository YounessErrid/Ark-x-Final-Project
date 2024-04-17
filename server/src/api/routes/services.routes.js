const express = require('express');
const router = express.Router();
const controller = require('../controllers/service.controller');

router.post('/', controller.create)
router.get('/:id', controller.findOne)
router.get('/', controller.viewAll)
router.put('/:id',controller.update)
router.delete('/:id',controller.remove)
module.exports = router;
/*const express = require('express');
const router = express.Router();
const controller = require('../controllers/service/service.controller');

router.post('/', controller.create)
router.get('/:id', controller.findOne)
router.get('/', controller.viewAll)
router.put('/:id',controller.update)
router.delete('/:id',controller.remove)
module.exports = router;*/
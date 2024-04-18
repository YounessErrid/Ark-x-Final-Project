const express = require('express');
const router = express.Router();
const controller = require('../controllers/portfolioservice.controller');
const upload = require("../middlewares/upload")


router.post('/', upload.array("images[]"), controller.create)
router.get('/:id', controller.findOne)
router.get('/', controller.viewAll)
router.put('/:id', upload.array("images[]"),controller.update)
router.delete('/:id',controller.remove)
module.exports = router;
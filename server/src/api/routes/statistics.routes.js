const express = require("express");
const router = express.Router();
const controller = require("../controllers/statistics.controller");


router.get('/', controller.statistics)
router.get('/revenue', controller.yearlyRevenueAndSubscription)
router.get('/transactions', controller.latesTransations)


module.exports = router
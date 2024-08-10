const express = require("express");
const router = express.Router();
const controller = require("../controllers/statistics.controller");
const { isAuthenticated } = require("../middlewares/userAuth.middleware");
const { authMiddleware } = require("../middlewares/roles");

router.get(
  "/",
  isAuthenticated,
  authMiddleware("admin", "superadmin"),
  controller.statistics
);
router.get(
  "/revenue",
  isAuthenticated,
  authMiddleware("admin", "superadmin"),
  controller.yearlyRevenueAndSubscription
);
router.get(
  "/transactions",
  isAuthenticated,
  authMiddleware("admin", "superadmin"),
  controller.latesTransations
);

module.exports = router;

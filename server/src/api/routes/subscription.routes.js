const express = require("express");
const router = express.Router();
const controller = require("../controllers/subscription.controller");
const { isAuthenticated } = require("../middlewares/userAuth.middleware");
const { authMiddleware } = require("../middlewares/roles");

// // CRUD routes for Subscription
router.post(
  "/",
  isAuthenticated,
  authMiddleware("admin", "superadmin"),
  controller.create
);
router.get(
  "/",
  isAuthenticated,
  authMiddleware("admin", "superadmin"),
  controller.viewAll
);
router.get(
  "/:id",
  isAuthenticated,
  authMiddleware("admin", "superadmin"),
  controller.findOne
);
router.put(
  "/:id",
  isAuthenticated,
  authMiddleware("admin", "superadmin"),
  controller.update
);
router.delete(
  "/:id",
  isAuthenticated,
  authMiddleware("admin", "superadmin"),
  controller.remove
);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controllers/payment.controller");
const { isAuthenticated } = require("../middlewares/userAuth.middleware");

// // CRUD routes for Subscription
router.post("/", isAuthenticated, controller.create);
router.get("/", isAuthenticated, controller.viewAll);
router.get("/:id", isAuthenticated, controller.findOne);
router.put("/:id", isAuthenticated, controller.update);
router.delete("/:id", isAuthenticated, controller.remove);

module.exports = router;

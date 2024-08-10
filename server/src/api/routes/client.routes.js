const express = require("express");
const router = express.Router();
const controller = require("../controllers/client.controller");
// const authController = require('../controllers/client/auth.controller');
const {
  authenticate,
  isAuthenticated,
} = require("../middlewares/userAuth.middleware");
const validateLoginInput = require("../validations/loginUser.validator");
const validateRegisterClient = require("../validations/registerClient.validator");
const upload = require("../middlewares/upload");
const { authMiddleware } = require("../middlewares/roles");

// Auth routes
router.post(
  "/auth/register",
  [upload.single("profile_image"), validateRegisterClient],
  controller.register
);
router.post(
  "/auth/login",
  [validateLoginInput],
  authenticate,
  controller.login
);
router.post("/contact", isAuthenticated, controller.contact);
router.get("/auth/logout", controller.destroy);

// // CRUD routes for Post
// router.post('/', controller.create)
router.get(
  "/",
  isAuthenticated,
  authMiddleware("admin", "superadmin"),
  controller.viewAll
);

router.delete(
  "/:id",
  isAuthenticated,
  authMiddleware("admin", "superadmin"),
  controller.remove
);

module.exports = router;

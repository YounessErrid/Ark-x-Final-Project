const express = require("express");
const router = express.Router();
const controller = require("../controllers/agency.controller");
const {
  authenticate,
  isAuthenticated,
} = require("../middlewares/userAuth.middleware");
const validateLoginInput = require("../validations/loginUser.validator");
const validateRegisterAgency = require("../validations/registerAgency.validator");
const upload = require("../middlewares/upload");
const { authMiddleware } = require("../middlewares/roles");

// Auth routes
router.post(
  "/auth/register",
  [upload.single("profile_image"), validateRegisterAgency],
  controller.register
);
router.post("/auth/check-email", controller.checkAgencyEmail);
router.post(
  "/auth/login",
  [validateLoginInput],
  authenticate,
  controller.login
);
router.get("/auth/logout", controller.destroy);

// // CRUD routes for Post
// router.post('/', controller.create)
router.get("/", controller.viewAll);
router.get("/search", controller.globalSearch);
router.get("/:id", controller.findOne);
router.put(
  "/:id",
  isAuthenticated,
  authMiddleware("agency", "admin", "superadmin"),
  controller.update
);
router.delete(
  "/:id",
  isAuthenticated,
  authMiddleware("agency", "admin", "superadmin"),
  controller.remove
);

// router.put('/:id', controller.update)
// router.delete('/:id', controller.remove)

module.exports = router;

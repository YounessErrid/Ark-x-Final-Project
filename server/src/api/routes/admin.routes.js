const express = require("express");
const router = express.Router();
const controller = require("../controllers/admin.controller");
const {
  authenticate,
  isAuthenticated,
} = require("../middlewares/userAuth.middleware");
const validateRegisterAdmin = require("../validations/registerAdmin.validator");
const validateLoginUser = require("../validations/loginUser.validator");
const upload = require("../middlewares/upload");
const { isSuperAdmin } = require("../middlewares/roles");

// Auth routes

router.post(
  "/auth/register",
  [upload.single("profile_image"), validateRegisterAdmin],
  controller.register
);

router.post(
  "/createAdmin",
  [validateRegisterAdmin, isSuperAdmin],
  controller.createAdmin
);

router.post("/auth/login", [validateLoginUser], authenticate, controller.login);
router.get("/auth/logout", controller.destroy);
router.get("/auth/checkSession", controller.checkSession);
router.post("/auth/forgotPassword", controller.forgotPassword);
router.put("/auth/resetPassword/:token", controller.resetPassword);
// CRUD routes for Post
// router.post('/', controller.create)
router.get('/', controller.viewAll)
// router.get('/:id', controller.findOne)
router.put('/:id', [ isSuperAdmin], controller.update)
router.delete('/:id',  [ isSuperAdmin], controller.remove)

module.exports = router;

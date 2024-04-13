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

// Auth routes
router.post(
  "/auth/register",
  [upload.single("profile"), validateRegisterClient],
  controller.register
);
router.post(
  "/auth/login",
  [validateLoginInput],
  authenticate,
  controller.login
);
router.get("/auth/logout", controller.destroy);

// // CRUD routes for Post
// router.post('/', controller.create)
// router.get('/', controller.viewAll)
// router.get('/:id', controller.findOne)
// router.put('/:id', isAuthenticated, controller.update)
// router.delete('/:id', controller.remove)

module.exports = router;

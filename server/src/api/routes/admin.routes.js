const express = require("express");
const router = express.Router();
const controller = require("../controllers/admin.controller");
const {authenticate,isAuthenticated,} = require("../middlewares/userAuth.middleware");
const validateRegisterAdmin = require("../validations/registerAdmin.validator");
const validateLoginUser = require("../validations/loginUser.validator");
const upload = require("../middlewares/upload");
const { isSuperAdmin } = require("../middlewares/roles");

// Auth routes

router.post("/auth/register",[upload.single("profile_image"), validateRegisterAdmin],controller.register
);

// create admin
router.post("/createAdmin",[validateRegisterAdmin, isSuperAdmin], controller.createAdmin
);

router.post("/auth/login", [validateLoginUser], authenticate, controller.login);
router.get("/auth/logout", controller.destroy);
router.get("/auth/checkSession", controller.checkSession);
router.post("/auth/forgotPassword", controller.forgotPassword);
router.put("/auth/update/:id",upload.single("profile_image"), controller.update
);
router.put("/auth/resetPassword/:token", controller.resetPassword);
router.put("/auth/changePassword/:id", controller.changePassword);

router.get("/", controller.viewAll);
router.delete("/:id", [isSuperAdmin], controller.remove);

module.exports = router;

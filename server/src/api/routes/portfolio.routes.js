const express = require("express");
const router = express.Router();
const controller = require("../controllers/portfolio.controller");
const upload = require("../middlewares/upload");
const { isAuthenticated } = require("../middlewares/userAuth.middleware");
const { authMiddleware } = require("../middlewares/roles");

const uploadFields = upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "cover", maxCount: 1 },
]);

router.post(
  "/",
  isAuthenticated,
  authMiddleware("agency", "admin", "superadmin"),
  uploadFields,
  controller.create
);
// router.post("/", controller.create);
router.get("/:id", isAuthenticated, controller.findOne);
router.get("/", isAuthenticated, controller.viewAll);
router.put(
  "/:id",
  isAuthenticated,
  authMiddleware("agency", "admin", "superadmin"),
  uploadFields,
  controller.update
);
router.delete(
  "/:id",
  isAuthenticated,
  authMiddleware("agency", "admin", "superadmin"),
  controller.remove
);

module.exports = router;

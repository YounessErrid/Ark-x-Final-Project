const express = require("express");
const router = express.Router();
const controller = require("../controllers/portfolio.controller");
const upload = require("../middlewares/upload");

const uploadFields = upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'cover', maxCount: 1 }
]);

router.post(
  "/",
  uploadFields,
  controller.create
);
router.get("/:id", controller.findOne);
router.get("/", controller.viewAll);
router.put("/:id", controller.update);
// router.delete('/:id',controller.remove)
module.exports = router;
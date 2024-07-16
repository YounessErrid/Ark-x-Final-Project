const express = require("express");
const router = express.Router();
const controller = require("../controllers/portfolioservice.controller");
const upload = require("../middlewares/upload");
const { isAuthenticated } = require("../middlewares/userAuth.middleware");

// router.use('/', express.static(path.join(__dirname, 'uploads')));

router.post(
  "/",
  isAuthenticated,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  controller.create
);
router.get("/:id", controller.findPortfolioByAgencyId);
router.get("/agency/:id", controller.findOne);
// router.get("/:id", controller.findOne);
router.get("/", controller.viewAll);
router.put(
  "/:id",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  controller.update
);
router.delete("/:id", controller.remove);
module.exports = router;
/*const express = require('express');
const router = express.Router();
const controller = require('../controllers/portfolioservice/portfolioservices.controller');
const upload = require("../middlewares/upload")


router.post('/', upload.array("image[]"), controller.create)
// router.get('/:id', controller.findOne)
// router.get('/', controller.viewAll)
// router.put('/:id',controller.update)
// router.delete('/:id',controller.remove)
module.exports = router;*/

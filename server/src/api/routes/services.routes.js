const express = require("express");
const router = express.Router();
const controller = require("../controllers/service.controller");
const { isAuthenticated } = require("../middlewares/userAuth.middleware");
const { authMiddleware } = require("../middlewares/roles");

router.post(
  "/",
  isAuthenticated,
  authMiddleware("admin", "superadmin"),
  controller.create
);
router.get(
  "/:id",
  isAuthenticated,
  authMiddleware("admin", "superadmin"),
  controller.findOne
);
router.get(
  "/",
  isAuthenticated,
  authMiddleware("admin", "superadmin"),
  controller.viewAll
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

/*const express = require('express');
const router = express.Router();
const controller = require('../controllers/service/service.controller');

router.post('/', controller.create)
router.get('/:id', controller.findOne)
router.get('/', controller.viewAll)
router.put('/:id',controller.update)
router.delete('/:id',controller.remove)
module.exports = router;*/

const { authJwt } = require("../middlewares");
const controller = require("../controllers/solutions.controller");
var express = require('express');
var router = express.Router();

router.get(
  "/",
  [
    authJwt.verifyToken
  ],
  controller.index
);
router.post(
    "/",
    [
      authJwt.verifyToken
    ],
    controller.create
  );
router.get(
  "/:id",
  [
    authJwt.verifyToken
  ],
  controller.show
);  
router.put(
  "/:id",
  [
    authJwt.verifyToken
  ],
  controller.update
); 
router.delete(
  "/:id",
  [
    authJwt.verifyToken
  ],
  controller.delete
); 
 module.exports = router;
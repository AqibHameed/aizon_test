const { authJwt } = require("../middlewares");
const { verifyWidget } = require("../middlewares");
const controller = require("../controllers/widgets.controller");
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
  "/:widgetId",
  [
    authJwt.verifyToken
  ],
  controller.show
);  
router.put(
  "/:widgetId",
  [
    authJwt.verifyToken
    //verifyWidget.checkWidgetExist
  ],
  controller.update
); 
router.delete(
  "/:widgetId",
  [
    authJwt.verifyToken,
    verifyWidget.checkWidgetExist
  ],
  controller.delete
); 
 module.exports = router;
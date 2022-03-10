const { authJwt } = require("../middlewares");
const { verifyScreen } = require("../middlewares");
const controller = require("../controllers/screens.controller");
const widget = require('./widget.routes')
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
  "/:screenId",
  [
    authJwt.verifyToken
  ],
  controller.show
);  
router.put(
  "/:screenId",
  [
    authJwt.verifyToken,
    verifyScreen.checkScreenExist
  ],
  controller.update
); 
router.delete(
  "/:screenId",
  [
    authJwt.verifyToken,
    verifyScreen.checkScreenExist
  ],
  controller.delete
); 
//nest the routes
router.use('/:screenId/widgets', function(req, res, next) {
    req.screenId = req.params.screenId;
    next()
  }, widget);
 module.exports = router;
const { authJwt } = require("../middlewares");
const { verifyWidget } = require("../middlewares");
const controller = require("../controllers/widgets.controller");
var express = require('express');
const {uploadFile} = require("../services/upload.S3.service");
const deleteFile = require("../services/deleteFile.S3.service");
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
      authJwt.verifyToken,
      uploadFile.single('file')
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
    verifyWidget.checkWidgetExist,
    deleteFile.s3FileDeleted
  ],
  controller.delete
); 

 module.exports = router;
const { authJwt } = require("../middlewares");
const { verifySolution } = require("../middlewares");
const controller = require("../controllers/solutions.controller");
const screen = require('./screen.routes')
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
  "/:solutionId",
  [
    authJwt.verifyToken
  ],
  controller.show
);  
router.put(
  "/:solutionId",
  [
    authJwt.verifyToken,
    verifySolution.checkSolutionExist
  ],
  controller.update
); 
router.delete(
  "/:solutionId",
  [
    authJwt.verifyToken,
    verifySolution.checkSolutionExist
  ],
  controller.delete
); 
//nest the routes for screens
router.use('/:solutionId/screens', function(req, res, next) {
  req.solutionId = req.params.solutionId;
  next()
}, screen);

 module.exports = router;
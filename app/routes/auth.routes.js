const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
var express = require('express');
var router = express.Router();
  router.post(
    "/signup",
    // [
    //   verifySignUp.checkDuplicateUsernameOrEmail
    // ],
    controller.signup
  );
  router.post("/signin", controller.signin);
  module.exports = router;
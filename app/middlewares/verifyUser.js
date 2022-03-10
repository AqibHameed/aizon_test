const db = require("../models");
const User = db.user;
checkUserexist = (req, res, next) => {
  // Find user by Id
  User.findOne({
    where: {
      id: req.body.userId
    }
  }).then(user => {
    if (user) {
            next();
    }else{
          res.status(400).send({
            message: "Failed! User is not exist!"
          });
          return;
    }
  });
};

const verifyUser = {
    checkUserexist: checkUserexist
};
module.exports = verifyUser;
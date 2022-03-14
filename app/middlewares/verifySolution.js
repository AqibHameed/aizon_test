const db = require("../models");
const Solution = db.solution;
checkSolutionExist = (req, res, next) => {
  // Find solution by Id
  Solution.findByPk(req.params.solutionId)
  .then(solution => {
    if (solution) {
            next();
    }else{
          res.status(400).send({
            message: "Failed! soultion not found with id!"
          });
          return;
    }
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

const verifySolution = {
    checkSolutionExist: checkSolutionExist
};

module.exports = verifySolution;
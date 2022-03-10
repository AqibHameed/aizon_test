const db = require("../models");
const Solution = db.solution
exports.index = (req, res) => {
    // Save Solution to Database
    Solution.findAll()
      .then(solutions => {
        res.status(200).send({
            solutions: solutions
         }); 
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

exports.create = (req, res) => {
  // Save Solution to Database
  const solution = new Solution({
    name: req.body.name,
    userId: req.userId
  });
  solution.save()
    .then(solution => {
       res.send({ message: "Solution was created successfully!" }); 
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.show = (req, res) => {
    // find Solution on the basis of the Id
    Solution.findByPk(req.params.solutionId)
      .then(solution => {
            if(!solution) {
                return res.status(404).send({
                    message: "solution not found with id " + req.params.id
                });            
            }
            res.send(solution); 
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.update = (req, res) => {
    // update Solution on the basis of the Id
    if(!req.body.name) {
        return res.status(400).send({
            message: "Solution name can not be empty"
        });
    }
    Solution.update({ name: req.body.name },
      { where: {id: req.params.solutionId}
      })
      .then(function() {
              res.send({ message: "Solution was updated successfully!" });
      })
      .catch(err => {
          res.status(500).send({ message: err.message });
      });
    
  };
  exports.delete = (req, res) => {
    // delete Solution on the basis of the Id
    Solution.destroy({ 
      where: {
          id: req.params.solutionId
      }
    })
    .then(function() {
            res.send({ message: "Solution was deleted successfully!" });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
  };

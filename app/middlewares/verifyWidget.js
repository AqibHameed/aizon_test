const db = require("../models");
const Widget = db.widget;
checkWidgetExist = (req, res, next) => {
  // Find widget by Id
  Widget.findByPk(req.params.widgetId)
  .then(widget => {
      if (widget) {
              next();
      }else{
            res.status(400).send({
              message: "Failed! screen not found with id!"
            });
            return;
      }
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

const verifyWidget = {
    checkWidgetExist: checkWidgetExist
};

module.exports = verifyWidget;
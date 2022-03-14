const db = require("../models");
const {uploadFile} = require("../services/upload.S3.service");
const Widget = db.widget
exports.index = (req, res) => {
    // Save Widget to Database
    Widget.findAll()
      .then(widgets => {
        res.status(200).send({
            widgets: widgets
         }); 
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

exports.create =  (req, res) => {
  // Save widget to Database
  const widget = new Widget({
    name: req.body.name,
    imageName: req.file.originalname,
    imageUrl:  req.file.location,
    bucketName: req.file.bucket,
    key: req.file.key,
    contentType: req.file.mimetype
  });
  widget.save()
    .then(widget => {
        //req.screenId
        widget.setScreens([req.body.screenId]).then(() => {
            res.send({ message: "Widget is created successfully!",
                       data: widget
           });
          });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.show = (req, res) => {
    // find Widget on the basis of the Id
    Widget.findByPk(req.params.widgetId)
      .then(widget => {
            if(!widget) {
                return res.status(404).send({
                    message: "widget not found with id " + req.params.widgetId
                });            
            }
            res.send(widget); 
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.update = (req, res) => {
    // update Widget on the basis of the Id
    if(!req.body.name) {
        return res.status(400).send({
            message: "Widget name can not be empty"
        });
    }
    Widget.findByPk(req.params.widgetId)
      .then(widget => {
            if(!widget) {
                return res.status(404).send({
                    message: "Widget not found with id " + req.params.widgetId
                });            
            }
            widget.update({ name: req.body.name }
                // { where: {id: req.params.screenId}}
                )
                .then(function() {
                        if(req.params.screenId){
                          widget.setScreens([req.body.screenId]).then(() => {
                              res.send({ message: "Widget and its screen relationship updated successfully" });
                            });
                        }
                        res.send({ message: "Widget is updated successfully!" });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                }); 
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
    
    
  };
  exports.delete = (req, res) => {
    // delete widget on the basis of the Id
    Widget.destroy({ 
      where: {
          id: req.params.widgetId
      }
    })
    .then(function() {
            res.send({ message: "Widget was deleted successfully!" });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
  };

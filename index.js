const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var auth = require('./app/routes/auth.routes')
var solution = require('./app/routes/solution.routes')
var screen = require('./app/routes/screen.routes')
var widget = require('./app/routes/widget.routes')

const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const db = require("./app/models");
//db.sequelize.sync();
// routes
app.use('/api/auth', auth);
app.use('/api/screens', screen);
app.use('/api/solutions', solution);


module.exports = app
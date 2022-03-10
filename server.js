const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var auth = require('./app/routes/auth.routes')
var solution = require('./app/routes/solution.routes')
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
db.sequelize.sync();
// routes
app.use('/api/auth', auth);
app.use('/api/solutions', solution);
//require('./app/routes/solution.routes')(app);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Aizon application." });
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
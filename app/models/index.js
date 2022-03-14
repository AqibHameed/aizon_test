const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.solution = require("../models/solution.model.js")(sequelize, Sequelize);
db.screen = require("../models/screen.model.js")(sequelize, Sequelize);
db.widget = require("../models/widget.model.js")(sequelize, Sequelize);

db.user.hasMany(db.solution, {
  foreignKey: {name: "userId", allowNull: false}
});
db.solution.belongsTo(db.user, {
  foreignKey: {name: "userId", allowNull: false}
});

db.solution.hasMany(db.screen, {
  foreignKey: {name: "solutionId", allowNull: false}
});
db.screen.belongsTo(db.solution, {
  foreignKey: {name: "solutionId", allowNull: false}
});

db.screen.belongsToMany(db.widget, {
  through: "screen_widgets",
  foreignKey: "screenId",
  otherKey: "widgetId"
});
db.widget.belongsToMany(db.screen, {
  through: "screen_widgets",
  foreignKey: "widgetId",
  otherKey: "screenId"
});

module.exports = db;
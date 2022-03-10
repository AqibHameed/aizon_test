module.exports = (sequelize, Sequelize) => {
    const Screen = sequelize.define("screens", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,  
        unique: true
      },
      Visibility: {
        type: Sequelize.BOOLEAN
      }
    });
    return Screen;
};
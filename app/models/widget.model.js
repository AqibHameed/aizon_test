module.exports = (sequelize, Sequelize) => {
    const Widget = sequelize.define("widgets", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,  
        unique: true
      },
      imageName: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      bucketName: {
        type: Sequelize.STRING
      },
      contentType: {
        type: Sequelize.STRING
      }
    });
    return Widget;
};
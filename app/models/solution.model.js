module.exports = (sequelize, Sequelize) => {
    const Solution = sequelize.define("solutions", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,  
        unique: true
      }
    },{
      indexes:[
       {
         fields:['userId']
       }
      ]
    });
    return Solution;
};
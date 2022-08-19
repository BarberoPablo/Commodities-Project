const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  
  //Definicion del modelo ReviewUser:
  sequelize.define('reviewUser', {
    average: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    idReview: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    display: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  })
}
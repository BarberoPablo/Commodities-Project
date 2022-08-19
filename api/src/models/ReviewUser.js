const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  
  //Definicion del modelo ReviewUser:
  sequelize.define('reviewUser', {
    average: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    reviews: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false
    },
    display: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  })
}
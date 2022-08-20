const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  
  //Definicion del modelo ReviewUser:
  sequelize.define('reviewUser', {
    average: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    reviews: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: []
    },
    scoreSum: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    display: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  })
}
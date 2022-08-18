const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  
  //Definicion del modelo Category:
  sequelize.define('feedback', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    display: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  })
}
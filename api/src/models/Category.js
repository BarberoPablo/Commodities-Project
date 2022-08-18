const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  
  //Definicion del modelo Category:
  sequelize.define('category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    display: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  })
}
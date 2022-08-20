const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  
  //Definicion del modelo Category:
  sequelize.define('category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    display: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    subcategories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: []
    }  })
}
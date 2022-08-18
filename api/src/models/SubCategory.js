const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  
  //Definicion del modelo SubCategory:
  sequelize.define('subCategory', {
    //Tiene una ForeignKey idCategory
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
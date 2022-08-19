const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  
  //Definicion del modelo Review:
  sequelize.define('review', {
    comment: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    display: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  })
}
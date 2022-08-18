const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  
  //Definicion del modelo ReviewUser:
  sequelize.define('reviewUser', {
    average: {
      type: DataTypes.FLOAT(0),
      allowNull: false,
    },
    idReview: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    display: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  })
}
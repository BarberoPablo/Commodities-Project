const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    sell: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    shipping: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    payment: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    subCategory: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    display: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    country: {
      type: DataTypes.STRING,
    }
  });
};

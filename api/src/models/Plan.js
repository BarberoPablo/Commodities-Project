const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('plan', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    contacts: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    posts: {
      type: DataTypes.BOOLEAN
    },
    reviews: {
      type: DataTypes.BOOLEAN
    },
  });
};

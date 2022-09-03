const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("plan", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contacts: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    posts: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    reviews: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};

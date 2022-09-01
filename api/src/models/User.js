const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactsIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
    },
    remainingContacts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    favoritesIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
  });
};

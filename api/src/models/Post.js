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
    idCategory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idSubcategory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
   
    display: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }
  );
};

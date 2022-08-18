const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isSeller: { //isBuyer no lo puse
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING, //STRING
      allowNull: true, //true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,//true
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, //nuevo 
    },
    country: {
      type: DataTypes.STRING, //ENUM ??
      allowNull: false,
    },
    shipping: {
      type: DataTypes.BOOLEAN,//ENUM con CIF y FOB
      allowNull: false,
    },
    //idPlan foreign key
    contactsId: {
      type: DataTypes.ARRAY(DataTypes.STRING), //se guardan los id de los match
    },
    remainingContacts: {
      type: DataTypes.INTEGER,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

  });
};

const { Category, Feedback, Plan, Post, Review, ReviewUser, SubCategory, User } = require("../db");

/* const getDbInfo = async () => {
  // quiero incluir el modelo Genre con el atributo: name
  // el through es una comprobacion que pongo siempre
  // me trae Videogame con sus generos
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"], //el id lo trae solo
      through: {
        attributes: [],
      },
    },
  });
}; */

const getUserDetails = async(req, res)=>{
  try {
    
  } catch (error) {
    
  }
}

module.exports = {getUserDetails}

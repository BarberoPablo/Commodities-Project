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

const getCategory = async (req , res) => {
  try {
    let category = await Category.findAll({
      include: SubCategory
     });
     
     res.status(200).send(category)

  } catch (error) {
    res.status(404).send(error)
  }
}



module.exports = {getUserDetails , getCategory}

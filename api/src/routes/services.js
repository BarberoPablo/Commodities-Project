const { Category, Feedback, Plan, Post, Review, ReviewUser, SubCategory, User } = require("../db");


const getUserDetails = async(req, res)=>{
  try {
    
  } catch (error) {
    
  }
}

// GET review devuelve la review que se le consulta por el id
const getReviews = async(req, res)=>{
  try {
   const {id} = req.params;
   let reviews = await ReviewUser.findOne({
    where: {id: id}
   });
   return res.status(200).send(reviews);
  } catch (error) {
    console.log (error);
    return res.status(404).send("The reviews selected are no longer available");
  }
};

//Create review debe crear el review correspondiente y a su vez debe actualizar las 
//estadísticas de los reviews de quien la recibe en la tabla ReviewUser
const createReview = async(req, res)=>{
  const {comment, score, userId, idReviewer} = req.body
  try {
   if (comment.length < 255) {
    let newReview = await ReviewUser.findOrCreate({
      where: {userId : userId}
    },
    {
      reviews: reviews.concat({"comment":comment, "score":score, "idReviewer":idReviewer}),
      scoreSum: scoreSum+score,
      average: scoreSum/reviews.length,//si falla agregar el this.
      display: true
    })
    return res.status(201).json(newReview)
   };
   
  } catch (error) {
    console.log (error);
    return res.status(404).send("The review selected is no longer available");
  }
};
/*hace un find or create para buscar el userId del personale con el review
hacer una array de tres campos,
comentario:""
score:0-5
idReviewer
*/

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

module.exports = {getUserDetails , getCategory, getReviews, createReview}


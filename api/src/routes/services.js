const { Category, Feedback, Plan, Post, Review, ReviewUser, SubCategory, User } = require("../db");


const getUserDetails = async(req, res)=>{
  try {
    
  } catch (error) {
    
  }
}


const getReview = async(req, res)=>{
  try {
   const {id} = req.params;
   let review = await b2b.findOne({
    where: {id: id}
   });
   return review;
  } catch (error) {
    console.log (error)
  }
};

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

module.exports = {getUserDetails , getCategory, getReview}


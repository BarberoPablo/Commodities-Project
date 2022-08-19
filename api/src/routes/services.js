const { Category, Feedback, Plan, Post, Review, ReviewUser, SubCategory, User } = require("../db");


const getUserDetails = async(req, res)=>{
  try {
    
  } catch (error) {
    
  }
}

const getReview = async(req, res)=>{
  try {
   const {id} = req.params;
   let review = await b2b.find({
    id: id
   });
   return review;
  } catch (error) {
    console.log (error)
  }
};

module.exports = {getUserDetails, getReview}

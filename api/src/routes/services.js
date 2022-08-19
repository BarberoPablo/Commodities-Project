const { Category, Feedback, Plan, Post, Review, ReviewUser, SubCategory, User } = require("../db");

const getUserDetails = async(req, res)=>{
  try {

  } catch (error) {
    
  }
}

const getPosts = async(req, res)=>{
  try {
    const {idUser} = req.query;
    const {idPost} = req.params;
    
    //Si no recibo un id de usuario y un id de post entonces devuelvo todos los posts
    if(!idUser && !idPost){
      //Chequear que funcione atributes: "" o atributes: []
      const posts = await Post.findAll({
        include: {
          model: Category,
          attributes: ["name"], //el id lo trae solo
          through: {
            attributes: "",
          },
        },
        include: {
          model: SubCategory,
          attributes: ["name"], //el id lo trae solo
          through: {
            attributes: "",
          },
        }
      })
      return res.status(200).json(posts)
    }
    
    //Si solo me pasan el id del user y no del post, devuelvo todos los posts del user
    if(!idPost && idUser){
      //Chequear que funcione atributes: "" o atributes: []
      const posts = await Post.findAll({
        where: {idUser: idUser},
        include: {
          model: Category,
          attributes: ["name"], //el id lo trae solo
          through: {
            attributes: "",
          },
        },
        include: {
          model: SubCategory,
          attributes: ["name"], //el id lo trae solo
          through: {
            attributes: "",
          },
        }
      })
      return res.status(200).json(posts)
    }
    
    //Si me pasan id de usuario y post, solo devuelve ese post del usuario en particular
    if(idPost && idUser){
      //Chequear que funcione atributes: "" o atributes: []
      const post = await Post.findOne({
        where: {
          idUser: idUser,
          idPost: idPost,
        },
        include: {
          model: Category,
          attributes: ["name"], //el id lo trae solo
          through: {
            attributes: "",
          },
        },
        include: {
          model: SubCategory,
          attributes: ["name"], //el id lo trae solo
          through: {
            attributes: "",
          },
        }
      })
      return res.status(200).json(post)
    }
    throw { status: 400, msg: `Error`}

  } catch (error) {
    res.status(error.status).send(error.msg)
  }
}

const createPost = async(req, res)=>{
  //HACER UN PROMISE ALL CON LAS PROMESAS
  try {
    const {id} = req.params;
    //Category y subCategory son id (integer)
    const {title, description, sell, category, subCategory, shipping, payment, image } = req.body;
    

    if(!id){
      throw { status: 400, msg: "id required"}
    }
    /*
    const user = User.findOne({
      where: {id:id}
    })  
    //Si no existe un usuario con ese id ocurre un error
    if(!user){
      throw { status: 400, msg: `User with id: ${id}, does not exists`}
    }

    if(!id || !description || !shipping || !payment || !category || !subCategory){
      throw { status: 400, msg: "Parameters error"}
    }
    //Buscar al user con el id "id" recibido por params y a ese agregarle el post
    
    Descomentar cuando esten las categorías
    const categoryInDb = await Category.findOne({ 
      where: {id:category},
    });
    //Si no encontro a la categoría ocurre un error:
    if(!categoryInDb){
      throw { status: 400, msg: "Category id not found"} 
    }
    const idCategoryInDb = categoryInDb.id;
    
    Descomentar cuando esten las subCategorías
    const subCategoryInDb = await SubCategory.findOne({ 
      where: {id:subCategory},
    }); 
    if(!subCategoryInDb){
      throw { status: 400, msg: "Sub-category id not found"} 
    }
    const idSubCategoryInDb = subCategoryInDb.id;
    */
    
    const newPost = await Post.create({
      title,
      description,
      sell,
      //Cambiar esto cuando se descomente la funcion:
      idCategory: idCategoryInDb,
      idSubcategory: idSubCategoryInDb,
      idUser: id, //idUser
      shipping,
      payment,
      image,
    })
    res.status(201).json(newPost);

  } catch (error) {
    res.status(error.status).send(error.msg)
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

const getSubCategory = async (req , res) => {
  try {
    const { id } = req.params

    let subCategory = await SubCategory.findAll({
      where : {idCategory: id},
    });

    res.status(200).json(subCategory)
    
  } catch (error) {
    res.status(404).send(subCategory)
  }
}


module.exports = {getUserDetails , createPost, getPosts, getCategory, getReviews, getSubCategory, createReview}

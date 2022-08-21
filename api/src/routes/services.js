
const { Category, Feedback, Plan, Post, Review, ReviewUser, User } = require("../db");
const axios = require("axios");

//Funcion anónima que se ejecuta al levantarse el back para cargar informacion en la base de datos:
(async () => {
  // Me traigo 10 usuarios de la API
  let usersRawData = await axios.get("https://randomuser.me/api/?results=10")
  // Creo 4 categorias
  const categories = [
    {name: "Agriculture", subcategories: ["Coffee", "Corn", "Rice", "Soybeans", "Sugar"]},
    {name: "Energy", subcategories: ["Gasoline", "Heating Fuel", "Natural Gas", "Petroleum"]},
    {name: "Livestock", subcategories: ["Beef Cattle", "Chicken Cattle", "Pig Cattle"]},
    {name: "Metals", subcategories: ["Copper", "Gold", "Platinum", "Silver"]},
  ]
  // Se crean 10 User en la database
  for(const person of usersRawData.data.results){
    await User.create({
      "name": `${person.name.first} ${person.name.last}`,
      "phone": person.phone,
      "email": person.email,
      "country": person.location.country,
      "image": person.picture.large
    });
  }
  //Se crean las categorías en la database:
  for(const category of categories){
    await Category.create({
      "name": category.name,
      "subcategories": category.subcategories,
    });
  }
})();

const getPosts = async(req, res)=>{
  try { 
    const posts = await Post.findAll();

    return res.status(200).json(posts)
  } catch (error) {
    res.status(error.status).send(error.message)
  }
}

const createPost = async(req, res)=>{
  try {
    //El id es del user a quien pertenece el post
    const {id} = req.params;
    //Category es un id (integer)
    const {title, description, sell, category, shipping, payment, image } = req.body;
    
    //Cuando este logeada la persona vamos a poder hacer que se mande us id para crear un post, mientras tanto no
    if(!id){
      throw { status: 400, message: "id required"};
    }
    const user = await User.findOne({
      where: {id:id}
    })  
    //Si no existe un usuario con ese id ocurre un error
    if(!user){
      throw { status: 400, message: `User with id: ${id}, does not exists`};
    }
    
    if(!description || !shipping || !payment || !category ){
      throw { status: 400, message: "Parameters error, check description, shipping, paymend and category"};
    }
    
    //Buscar al user con el id "id" recibido por params y a ese agregarle el post




    //Descomentar cuando esten las categorías
    const categoryInDb = await Category.findOne({ 
      where: {id:category},
    });
    //Si no encontro a la categoría ocurre un error:
    if(!categoryInDb){
      throw { status: 400, message: "Category id not found"} 
    }
    const categoryId = categoryInDb.id; // .toJSON?

    const newPost = await Post.create({
      title,
      description,
      sell,
      categoryId,
      userId: id,
      shipping,
      payment,
      image,
    })

    res.status(201).json(newPost);

  } catch (error) {
    res.status(error.status).send(error.message)
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
    return res.status(404).send("The reviews selected are no longer available");
  }
};

//Create review  debe actualizar las 
//estadísticas de los reviews de quien la recibe en la tabla ReviewUser
const createReview = async(req, res)=>{
  const {comment, score, userId, idReviewer} = req.body;
  try {
   if (comment.length < 255) {
    const userAlreadyExists = await ReviewUser.findOne({
      where: { userId : userId },
    });
    if(userAlreadyExists){
      const newReview = userAlreadyExists.toJSON();
      let scoreSum = newReview.scoreSum + score;
      newReview.reviews.push({"comment":comment, "score":score, "idReviewer":idReviewer});
      let reviews = newReview.reviews;
      let average = scoreSum/reviews.length;
      await userAlreadyExists.update({
        scoreSum,
        reviews,
        average,
      }) 
    } else {
      return res.status(404).send("The User selected doesn't exists");
    };
        return res.status(201).json(userAlreadyExists);
   };
   
  } catch (error) {
    return res.status(400).send("The review was not created");
  }
};

const getCategory = async (req , res) => {
  try {
    let category = await Category.findAll();

     res.status(200).send(category)

  } catch (error) {
    res.status(404).send(error)
  }
};

const createPlan = async(req, res)=>{
    try {
      const {name, cost, contacts, posts, reviews } = req.body;

      const newPlan = await Plan.create({
        name,
        cost,
        contacts,
        posts,
        reviews
      })
      res.status(201).json(newPlan);

  } catch (error) {
    res.status(error.status).send(error.message)
  }
};

const postCategory = async (req , res) => {
  const { name, subcategories } = req.body

  const newCategory = {name, subcategories}

  if (!name) {
    return res.status(400).send('Incomplete data')
  }
  try {
      const cat = await Category.create(newCategory)
      
      res.status(201).send(cat)
    
  } catch (error) {
    res.status(500).send(error)
  }
}

const createUser = async (req, res) => {
  //Propiedades de un User: name, phone, email, verified, country, contactsId, remainingContacts, isadmin, isbanned, image
  try {
    const {name, phone, email, country, image} = req.body;
    if(!name || !email || !country){
      throw {status: 400, message: "Parameters error, check name, email and country"}
    }
    //Si ya existe el email en la base de datos, para no romper todo mejor le damos un warning al usuario
    const emailAlreadyExists = await User.findOne({
      where: { email: email },
    });
    
    if(emailAlreadyExists){
      throw {status: 400, message: "Email already exists, please Log-in"}
    }
    /*Si la informacion esta correcta, creo el usuario
      El usuario al ser creado, como no tiene un plan, contactsId y remainingContacts no son seteados al igual que sus FK:
        planId, feedbackId, reviewUserId, postId
    */
    const newUser = await User.create({
      name,
      phone,
      email,
      country,
      image
    });
    let newReview = await ReviewUser.create({
      reviews:[],
      scoreSum: 0,
      average: 0,
      userId: newUser.id
    })
    res.status(201).json(newUser);

  } catch (error) {
    res.status(error.status).send(error.message)
  }

}

const getPlans = async (req, res) => {
  try {
    const plans= await Plan.findAll() 
    
    res.status(200).send(plans)
  } catch (error) {
    res.status(404).send(error)
  }
}

const getPlanDetail = async(req, res)=>{
  const {name} = req.params;

  try {
    let planDetail = await Plan.findOne({
      where: {name:name}
    });
    if (planDetail === null) {
      res.status(400).send(error)
    }
    else
      res.status(200).json(planDetail)
  } catch (error) {
    res.status(400).send(error);
  }
};

const assignPlanToUser = async (req, res) => {
  const {PlanId, id} = req.body;
  try {
    console.log("entré");
    const planExists = await Plan.findOne({
      where: { id : PlanId },
    });
    const userExists = await User.findOne({
      where: { id : id },
    });
    if(planExists && userExists) {
      let planId = planExists.toJSON().id
      await userExists.update({
        planId
      });
       res.status(201).json(userExists);
    } else {
      res.status(400).send("El plan o el usuario no existen");
    }
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { createPost, getPosts, getCategory, getReviews, 
  createReview , postCategory, createPlan, createUser , getPlans , getPlanDetail, assignPlanToUser}


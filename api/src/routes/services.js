const { Category, Feedback, Plan, Post, ReviewUser, User } = require("../db");
//const axios = require("axios");
const {api, categories, posts} = require('./jsons.js');

//Funcion anónima que se ejecuta al levantarse el back para cargar informacion en la base de datos:
(async () => {
  setTimeout( async () => {try {
    // Se crean los User en la base de datos
    for(const person of api){
      await User.create({
        name: `${person.name.first} ${person.name.last}`,
        phone: person.phone,
        email: person.email,
        country: person.location.country,
        image: person.picture.large
      });
    }
    //Se crean las Category en la database:
    for(const category of categories){
      await Category.create({
        name: category.name,
        subcategories: category.subcategories,
      });
    }
    //Se crean los Post en la database:
    for(const post of posts){
      await Post.create( {
        title: post.title,
        description: post.description,
        sell: post.sell,
        shipping: post.shipping,
        payment: post.payment,
        subCategory: post.subCategory,
        image: post.image,
        country: post.country,
        categoryName: post.categoryName,
        userId: post.userId
      });
    }
  } catch (error) {
    console.log(error.message);
  }},2000)
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
    const {title, description, sell, shipping, payment, subCategory, image, country, categoryName} = req.body;
    
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
    
    if(!description || !shipping || !payment || !categoryName || !country || !subCategory){
      throw { status: 400, message: "Parameters error, check description, shipping, paymend, country, category and subCategory"};
    }
    
    //Buscar al user con el id "id" recibido por params y a ese agregarle el post




    //Descomentar cuando esten las categorías
    const categoryInDb = await Category.findOne({ 
      where: {name:categoryName},
    });
    //Si no encontro a la categoría ocurre un error:
    if(!categoryInDb){
      throw { status: 400, message: "Category id not found"} 
    }
   // const categoryId = categoryInDb.id; // .toJSON?

    const newPost = await Post.create({
      title,
      description,
      sell,
      shipping,
      payment,
      subCategory,
      image,
      country,
      categoryName,
      userId: id
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

const modifyCategory = async (req, res) => {
  // get the name provided by params
  const {name} = req.params;
  //get the display property and subcategory property
  //En este punto asumimos que lo que venga por body va a reemplazar directamente lo que
  //teníamos previamente en los campos de la categoría. De manera que desde el front deben primero 
  //requerir todos los campos de la categoría, modificar y reenviar el resultado final.
  const {display, subcategories} = req.body;
  try {
    const categoryExists = await Category.findOne({
      where: { name : name },
    });
    if(categoryExists) {
      await categoryExists.update({
        display,
        subcategories
      });
       res.status(201).json(categoryExists);
    } else {
      res.status(400).send("The category selected does not exists");
    }
  } catch (error) {
    res.status(400).send(error);
  }
}  

//Propiedades de un User: name, phone, email, verified, country, contactsId, remainingContacts, isadmin, isbanned, image
const modifyOrCreateUser = async (req, res) => {
  try {
    const { country, email, image, name, phone } = req.body;

    if(!country || !email || !image || !name || !phone){
      throw {status: 400, message: "Please send all the properties of the new user, even the old ones"};
    }
    // Si el usuario no existe, se crea
    const [user, created] = await User.findOrCreate({
      where: { email : email },
      defaults:{
        email,
        country,
        image, 
        name,
        phone,
      }
    });
    // Uso la componente created para ver si se acaba de crear o si ya existía,
    // Si se acaba de crear tengo que crearle el userReviews:
    if (created) {  
      
      /* Arreglar la coneccion entre User y reviewUser, debería ser una FK y no lo es
      let newReview = await ReviewUser.create({
        reviews:[],
        scoreSum: 0,
        average: 0,
        userId: newUser.id
      }) */
      return res.status(200).send(user);
    }
    // Si el user ya existía, lo modifico:
    else {
      await user.update({
        country,
        email, 
        image,
        name,
        phone,
      })
      return res.status(201).json(user);  
    }

  } catch (error) {
    return res.status(400).send(error.message)
  }
}

const getUserDetail = async (req, res) => {
  const { id } = req.params
  try {
    let user = await User.findOne({
      where:
        {id:id}
    })
    if (user) {
      res.status(200).send(user)
    }
    else {
      res.status(404).send("User not found")
    }   
  } catch (error) {
    res.status(400).send(error)
  }
}  

const getAllUsers = async(req, res)=>{
  //Ruta util para el panel de usuario
  try { 
    const allUsers = await User.findAll();

    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(error.status).send(error.message)
  }
}

module.exports = { createPost, getPosts, getCategory, getReviews, 
  createReview , postCategory, createPlan, getPlans , 
  getPlanDetail, assignPlanToUser, modifyCategory, modifyOrCreateUser, getUserDetail, getAllUsers}


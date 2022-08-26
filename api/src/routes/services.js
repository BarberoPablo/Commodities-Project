const { Category, Feedback, Plan, Post, ReviewUser, User } = require("../db");
//const axios = require("axios");
const { users, categories, posts, plans } = require("./jsons.js");

//Funcion anónima que se ejecuta al levantarse el back para cargar informacion en la base de datos:
(async () => {
  setTimeout(async () => {
    //SACAR EL TIMEOUT
    try {
      // Se crean los User en la base de datos
      const allUsers = await User.bulkCreate(users);

      // Por cada usuario creo un ReviewUser
      for (const user of allUsers) {
        await ReviewUser.create({
          reviews: [],
          scoreSum: 0,
          average: 0,
          userId: user.id,
        });
      }

      //Se crean las Category en la database:
      await Category.bulkCreate(categories);

      //Se crean los Post en la database:
      await Post.bulkCreate(posts);

      //Se crean los Planes en la database:
      await Plan.bulkCreate(plans);
    } catch (error) {
      console.log(error.message);
    }
  }, 2000);
})();

const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();

    return res.status(200).json(posts);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

const createPost = async (req, res) => {
  try {
    //El id es del user a quien pertenece el post
    const { id } = req.params;
    //Category es un id (integer)
    const { title, description, sell, shipping, payment, subCategory, image, country, categoryName } = req.body;

    //Cuando este logeada la persona vamos a poder hacer que se mande us id para crear un post, mientras tanto no
    if (!id) {
      throw { status: 400, message: "id required" };
    }
    const user = await User.findOne({
      where: { id: id },
    });
    //Si no existe un usuario con ese id ocurre un error
    if (!user) {
      throw { status: 400, message: `User with id: ${id}, does not exists` };
    }

    if (!description || !shipping || !payment || !categoryName || !country || !subCategory) {
      throw {
        status: 400,
        message: "Parameters error, check description, shipping, paymend, country, category and subCategory",
      };
    }

    //Buscar al user con el id "id" recibido por params y a ese agregarle el post

    //Descomentar cuando esten las categorías
    const categoryInDb = await Category.findOne({
      where: { name: categoryName },
    });
    //Si no encontro a la categoría ocurre un error:
    if (!categoryInDb) {
      throw { status: 400, message: "Category id not found" };
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
      userId: id,
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

// GET review devuelve la review del user que se le consulta por el id
// y dentro de ella todas las reviews individuales
const getReviews = async (req, res) => {
  try {
    const { id } = req.params;
    let reviews = await ReviewUser.findOne({
      where: { id: id },
    });
    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(404).send("The reviews selected are no longer available");
  }
};

//Create review  debe actualizar las
//estadísticas de los reviews de quien la recibe en la tabla ReviewUser
const createReview = async (req, res) => {
  const { comment, score, userId, idReviewer } = req.body;
  try {
    if (comment.length < 512) {
      const userAlreadyExists = await ReviewUser.findOne({
        where: { userId: userId },
      });
      if (userAlreadyExists) {
        const newReview = userAlreadyExists.toJSON();
        let scoreSum = newReview.scoreSum + score;
        newReview.reviews.push({ comment: comment, score: score, idReviewer: idReviewer });
        let reviews = newReview.reviews;
        let average = scoreSum / reviews.length;
        await userAlreadyExists.update({
          scoreSum,
          reviews,
          average,
        });
      } else {
        return res.status(404).send("The User selected doesn't exists");
      }
      return res.status(201).json(userAlreadyExists);
    }
  } catch (error) {
    return res.status(400).send("The review was not created");
  }
};

const getCategory = async (req, res) => {
  try {
    let category = await Category.findAll();

    res.status(200).send(category);
  } catch (error) {
    res.status(404).send(error);
  }
};

const createPlan = async (req, res) => {
  try {
    const { name, cost, contacts, posts, reviews } = req.body;

    const newPlan = await Plan.create({
      name,
      cost,
      contacts,
      posts,
      reviews,
    });
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

const getPlanDetail = async (req, res) => {
  const { name } = req.params;

  try {
    if (name) {
      let planDetail = await Plan.findOne({
        where: { name: name },
      });
      if (planDetail === null) {
        res.status(400).send(error);
      } else res.status(200).json(planDetail);
    } else {
      const plans = await Plan.findAll();
      res.status(200).send(plans);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const assignPlanToUser = async (req, res) => {
  const { PlanId, id } = req.body;
  try {
    const planExists = await Plan.findOne({
      where: { id: PlanId },
    });
    const userExists = await User.findOne({
      where: { id: id },
    });
    if (planExists && userExists) {
      let planId = planExists.toJSON().id;
      await userExists.update({
        planId,
      });
      res.status(201).json(userExists);
    } else {
      res.status(400).send("El plan o el usuario no existen");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

// const postCategory = async (req , res) => {
//   const { name, subcategories } = req.body

//   const newCategory = {name, subcategories}

//   if (!name) {
//     return res.status(400).send('Incomplete data')
//   }
//   try {
//       const cat = await Category.create(newCategory)

//       res.status(201).send(cat)

//   } catch (error) {
//     res.status(500).send(error)
//   }
// };

const modifyOrCreateCategory = async (req, res) => {
  // get the name provided by params
  const { name } = req.params;
  //get the display property and subcategory property
  //En este punto asumimos que lo que venga por body va a reemplazar directamente lo que
  //teníamos previamente en los campos de la categoría. De manera que desde el front deben primero
  //requerir todos los campos de la categoría, modificar y reenviar el resultado final.
  const { display, subcategories } = req.body;
  try {
    const categoryExists = await Category.findOne({
      where: { name: name },
    });
    const newCategory = { name, subcategories };
    if (categoryExists) {
      await categoryExists.update({
        display,
        subcategories,
      });
      res.status(201).json(categoryExists);
    } else {
      const cat = await Category.create(newCategory);
      res.status(201).send(cat);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

//Propiedades de un User: name, phone, email, verified, country, contactsId, remainingContacts, isadmin, isbanned, image
const modifyOrCreateUser = async (req, res) => {
  try {
    const { country, email, image, name, phone } = req.body;

    if (!country || !email || !image || !name || !phone) {
      throw { status: 400, message: "Please send all the properties of the new user, even the old ones" };
    }
    // Si el usuario no existe, se crea
    const [user, created] = await User.findOrCreate({
      where: { email: email },
      defaults: {
        email,
        country,
        image,
        name,
        phone,
      },
    });
    // Uso la componente created para ver si se acaba de crear o si ya existía,
    // Si se acaba de crear tengo que crearle el userReviews:
    if (created) {
      let newReview = await ReviewUser.create({
        reviews: [],
        scoreSum: 0,
        average: 0,
        userId: user.id,
      });
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
      });
      return res.status(201).json(user);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getUserDetail = async (req, res) => {
  const { email } = req.params;
  try {
    let user = await User.findOne({
      where: { email: email },
    });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllUsers = async (req, res) => {
  //Ruta util para el panel de usuario
  try {
    const allUsers = await User.findAll();

    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(error.status).send(error.message);
  }
};

// Esta ruta es para los admins
const getFeedback = async (req , res) => {
  try {
    const allFeedback = await Feedback.findAll();
    
    return res.status(200).json(allFeedback) 

  } catch (error) {
    res.status(404).send(error)
  }
}

// esta ruta es para los usuarios
const postFeedback = async (req, res) => {
  // El email de quien realiza el feedback
  const { id } = req.params
  const { comment  } = req.body

  if (!comment) {
    res.status(400).send('Incomplete data')
  }
  try {
    let user = await User.findOne({
      where: { id: id },
    });
    
    if (user) {
      let newFeedback = await Feedback.create({
        comment,
        userId : id
      })
      res.status(201).send(newFeedback)
      }
    else {
      res.status(404).send("User not found")
    }
  } catch (error) {
    res.status(400).send(error)
  }
}

module.exports = {
  createPost,
  getPosts,
  getCategory,
  getReviews,
  createReview,
  createPlan,
  getPlanDetail,
  assignPlanToUser,
  modifyOrCreateCategory,
  modifyOrCreateUser,
  getUserDetail,
  getAllUsers,
  getFeedback,
  postFeedback
};

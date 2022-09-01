const { Category, Feedback, Plan, Post, ReviewUser, User } = require("../db");
//const axios = require("axios");
const { users, categories, posts, plans } = require("./jsons.js");
const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASS } = process.env;

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
    } catch (error) {}
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
    const { email } = req.params;
    //Category es un id (integer)
    const {
      title,
      description,
      sell,
      shipping,
      payment,
      subCategory,
      image,
      country,
      categoryName,
    } = req.body;

    //Cuando este logeada la persona vamos a poder hacer que se mande us id para crear un post, mientras tanto no
    if (
      !email ||
      !title ||
      !description ||
      !shipping[0] ||
      !payment[0] ||
      !subCategory ||
      !country ||
      !categoryName
    ) {
      throw { status: 400, message: "missing data" };
    }
    const user = await User.findOne({
      where: { email: email },
    });
    //Si no existe un usuario con ese id ocurre un error
    if (!user) {
      throw { status: 400, message: `User with id: ${email}, does not exists` };
    }

    if (
      !description ||
      !shipping ||
      !payment ||
      !categoryName ||
      !country ||
      !subCategory
    ) {
      throw {
        status: 400,
        message:
          "Parameters error, check description, shipping, paymend, country, category and subCategory",
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
      userId: user.id,
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
    console.log(id);
    if(id === "All") {
      var reviews = await ReviewUser.findAll();
    } else {
      var reviews = await ReviewUser.findOne({
        where: { userId: id },
      });
    }
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
    const reviewerExists = await ReviewUser.findOne({
      where: { userId: idReviewer}
    });
    if (comment.length < 512 ) {
      const userAlreadyExists = await ReviewUser.findOne({
        where: { userId: userId },
      });
      if (!reviewerExists) {
        return res.status(404).send("The Reviewer must be a valid user");
      }
      if (userAlreadyExists) {
        const newReview = userAlreadyExists.toJSON();
        let scoreSum = newReview.scoreSum + score;
        newReview.reviews.push({
          comment: comment,
          score: score,
          idReviewer: idReviewer,
          idReport: [],
        });
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
  try {
    const { planName, email } = req.body;
    const planExists = await Plan.findOne({
      where: { name: planName },
    });
    const userExists = await User.findOne({
      where: { email: email },
    });
    if (planExists && userExists) {
      console.log("@@:", planExists.contacts);
      await userExists.update({
        planName,
        remainingContacts: userExists.remainingContacts + planExists.contacts,
      });
      res.status(201).json(userExists);
    } else {
      res.status(400).send("El plan o el usuario no existen");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

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
      throw {
        status: 400,
        message:
          "Please send all the properties of the new user, even the old ones",
      };
    }
    // Si el usuario no existe, se crea
    const users = await User.findAll();
    const usersAmount = users.length + 1;
    const [user, created] = await User.findOrCreate({
      where: { email: email },
      defaults: {
        id: usersAmount,
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
      const plan = await Plan.findOne({
        where: { name: "Free" },
      });
      await user.update({
        planName: plan.name,
        remainingContacts: plan.contacts,
      });

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
    return res.status(400).json(error);
  }
};

const getUserDetail = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findOne({
      where: { id: id },
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

//Ruta pensada para enviar correos salientes a quien haga falta.
const sendEmail = async (req, res) => {
  const { from, to, subject, text, html } = req.body;
  try {
    var transport = {
      from,
      to,
      subject,
      text,
      html,
    };
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      tls: {
        ciphers: "SSLv3",
      },
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
    transporter.sendMail(transport, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: " + info.response);
      return res.status(200).send("Message sent correctly");
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Esta ruta es para los admins
const getFeedback = async (req, res) => {
  try {
    const allFeedback = await Feedback.findAll();

    return res.status(200).json(allFeedback);
  } catch (error) {
    res.status(404).send(error);
  }
};

// Esta ruta es para los usuarios
const postFeedback = async (req, res) => {
  try {
    // El id es del usuario que realiza el feedback
    const { id } = req.params;
    const { comment } = req.body;

    if (!id) {
      res.status(404).send("Id is required");
    }
    const user = await User.findOne({
      where: { id: id },
    });
    if (!user) {
      throw { status: 404, message: `User with id: ${id}, does not exists` };
    }

    if (!comment) {
      throw { status: 400, message: "Insert a comment please" };
    }

    const newFeedback = await Feedback.create({
      comment,
      userId: id,
    });
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getUserPosts = async (req, res) => {
  //Ruta util para el panel de usuario
  try {
    const { email } = req.params;
    const user = await User.findOne({
      where: { email: email },
    });

    if (user) {
      const userPosts = await Post.findAll({
        where: { userId: user.id },
      });
      return res.status(200).json(userPosts);
    } else {
      throw { status: 404, message: `User with email: ${email} not found}` };
    }
  } catch (error) {
    return res.status(error.status).send(error.message);
  }
};

const getAllPlans = async (req, res) => {
  //Ruta util para el panel de usuario
  try {
    const allPlans = await Plan.findAll();
    return res.status(200).json(allPlans);
  } catch (error) {
    return res.status(error.status).send(error.message);
  }
};

const modifyReview = async (req, res) => {
  //Ruta pensada para que los Admin puedan ocultar un review reportado
  //y para recibir un review reportado.
  //llega por params el id del user reportado, y el id del user que reporta.
  //Cuando se reporta un review, se agrega el id del que reporta al correspondiente review
  //Si el admin coincide en dar de baja el review este se borra y se corrigen las estadísticas.
  const { userId, idReview } = req.params; //userId el del usuario que recibió la review y el otro es el del user que hizo la review
  const { display, position } = req.body; // display es false or true si hay que borrar y id indica la poasición del review en el array
  try {
    if (!userId) {
      throw { status: 404, message: "Id is required" };
    }
    const user = await ReviewUser.findOne({
      where: { userId: userId },
    });
    if (!user) {
      throw {
        status: 404,
        message: `User with id: ${userId}, does not exists`,
      };
    }
    const newReview = user.toJSON();
    if (!display) {
      // si display === false entonces borro el review comentado, sino solo agrego el id del que reportó.
      //borrado del review cuestionado
      var scoreSum = newReview.scoreSum - newReview.reviews[position].score;
      newReview.reviews.splice(position, 1);
      var reviews = newReview.reviews;
      var average = scoreSum / reviews.length;
      console.log(newReview);
      // console.log(scoreSum);
    } else {
      //Aca marcamos el review para revisión
      newReview.reviews[position].idReport.push(idReview);
      var reviews = newReview.reviews;
      var scoreSum = newReview.scoreSum;
      var average = newReview.average;
      console.log(newReview);
    }
    await ReviewUser.upsert({
      id: userId,
      scoreSum,
      reviews,
      average,
    });
    return res.status(201).json("Review Updated");
  } catch (error) {
    return res.status(error.status).send(error.message);
  }
};

const addUserContact = async (req, res) => {
  const { idSearcher, idPoster } = req.params;

  try {
    const userSearcher = await User.findOne({
      where: { id: idSearcher },
    });

    const userPoster = await User.findOne({
      where: { id: idPoster },
    });

    if (!userSearcher) {
      throw {
        status: 400,
        message: `User searcher with id ${idSearcher} is not found`,
      };
    }

    if (!userPoster) {
      throw {
        status: 400,
        message: `User poster with id ${idPoster} is not found`,
      };
    }

    //Si las remainingContacts son mayores a 0 ingresa al IF y descuenta 1 mientras que
    // concatena el numero de ID del usuario que hizo el posteo en el contactsIds
    if (userSearcher.remainingContacts >= 1) {
      if (userSearcher.contactsIds.includes(userPoster.id)) {
        console.log("Entramos");
        throw { status: 404, message: "You are already connected with that user" };
      } else {
        await userSearcher.update({
          contactsIds: userSearcher.contactsIds.concat(userPoster.id),
          remainingContacts: userSearcher.remainingContacts - 1,
        });
        if (userSearcher.remainingContacts === 0) {
          await userSearcher.update({
            planName: plans[0].name,
          });
        }
        res.status(201).json(userSearcher);
      }
    } else {
      throw { status: 401, message: `You don't have remaining contacts available` };
    }
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

const userBan = async (req, res) => {
  // Al ser una ruta para el admin, no seria necesario ocultar los usuarios banneados, si se requiere traer solo a los
  // usuarios habilitados, tendria que ser mediante un filter que deje solo a los que tienen isBanned en false  
  const { id } = req.params
  
  try {
    const banUser= await User.findOne(
      {where: {id: id}}
    ) 
    if (!banUser) {
      throw { status: 400, message: `User searcher with id ${id} is not found` };
    }
    else if (banUser.isBanned) {
      await banUser.update({
        isBanned: false
      })
    }
    else {
      await banUser.update({
        isBanned: true
      })
    }
    return res.status(201).send(`User's ban has been modificated`)

  } catch (error) {
    res.status(error.status).send(error.message)
  }
};

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
  sendEmail,
  getFeedback,
  postFeedback,
  getUserPosts,
  getAllPlans,
  modifyReview,
  addUserContact,
  userBan
};

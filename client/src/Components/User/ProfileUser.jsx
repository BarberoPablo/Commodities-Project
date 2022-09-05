import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./Users.module.css";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import {
  getProfileDetails,
  getPost,
  getContactsUser,
  getUserDetails,
  postReview,
} from "../../Redux/Actions/Actions";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileUser = ({ match }) => {
  const id = match.params.id;
  const { profileUser } = useSelector((state) => state.users); //trae los datos de un usuario en especifico
  const { posts } = useSelector((state) => state.posts); //trae todos los posts
  const [showA, setShowA] = useState(false);
  const [length, setLength] = useState(0);
  const [newContact, setNewContact] = useState(false);

  // CHANGES
  // console.log('filter',filter)
  // console.log('posts',posts)

  const { user } = useAuth0();
  const dispatch = useDispatch();
  const userLog = useSelector((state) => state.users.user); // trae un array con los datos del usuario logeado
  const filter = posts.filter((e) => e.userId === profileUser.id); //filtra los posts del usuario seleccionado
  console.log(" userId: ", profileUser?.id, "idReview", userLog?.id);

  const [review, setReview] = useState({
    userId: profileUser.id,
    idReviewer: userLog.id,
    score: "",
    comment: "",
  });

  const handleChange = (e) => {
    setReview({
      ...review,
      userId: profileUser.id,
      idReviewer: userLog.id,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userLog?.id) {
      console.log("estado", review);
      dispatch(postReview(review));
    }
  };

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = (e) => {
    e.preventDefault();
    if (userLog.id) {
      //dispatch(getContactsUser(userLog?.id, id)); // dispatch llenar el array de contactos con el id del usuario logeado y el id del usuario que hizo el posteo
      dispatch(getContactsUser(userLog?.id, id));
      setNewContact(true);
      setShowA(!showA);
    } else {
      alert("Try again in a few seconds");
    }
  };

  useEffect(() => {
    //setNewContact(false);
    dispatch(getProfileDetails(id)); //trae los datos del usuario en especifico
    dispatch(getPost()); //trae todos los posteos
    console.log("auth0", user);
    if (user) {
      dispatch(getUserDetails(user.email));
    }
    setLength(userLog.contactsIds?.length);
  }, [dispatch, user, length, newContact, id, userLog.contactsIds?.length]);

  return (
    /*
    userLog.contactsIds?.includes(profileUser.id) ?
    */
    <>
      {profileUser ? (
        <div className={s.container}>
          <div className={s.card}>
            <div className={s.user_photo} id="user_photo">
              <img src={profileUser.image} alt="a" />
            </div>
            {userLog && userLog.remainingContacts > 0 ? (
              <>
                {userLog.contactsIds?.includes(profileUser?.id) ? (
                  <Button
                    variant="secondary"
                    className={s.btn}
                    size="sm"
                    onClick={toggleShowA}
                    disabled
                  >
                    Contact
                  </Button>
                ) : (
                  <Button
                    variant="warning"
                    className={s.btn}
                    size="sm"
                    onClick={toggleShowA}
                  >
                    Contact
                  </Button>
                )}
                <ToastContainer position="bottom-center">
                  <Toast show={showA} onClose={toggleShowA} bg="secondary">
                    <Toast.Body>
                      By accepting, one of your contacts will be deducted, are
                      you sure?
                    </Toast.Body>
                    <Button variant="success" size="sm" onClick={toggleShowB}>
                      Accept
                    </Button>
                    <Button
                      style={{ margin: "10px" }}
                      variant="danger"
                      size="sm"
                      onClick={toggleShowA}
                    >
                      Cancel
                    </Button>
                  </Toast>
                </ToastContainer>
              </>
            ) : (
              <>
                <h5>You must have a membership to make contact</h5>
                <Button
                  variant="secondary"
                  className={s.btn}
                  size="sm"
                  disabled
                >
                  Contact
                </Button>
              </>
            )}
          </div>

          <div className={s.containerPost}>
            {userLog.contactsIds?.includes(profileUser.id) ? (
              <>
                <div className={s.userDates}>
                  <p>
                    <b>Name: </b>
                    {profileUser.name}
                  </p>
                  <p>
                    <b>Email: </b>
                    {profileUser.email}
                  </p>
                  <p>
                    <b>Phone: </b>
                    {profileUser.phone}
                  </p>
                  <p>
                    <b>Country: </b>
                    {profileUser.country}
                  </p>
                  <div>
                    <form onSubmit={handleSubmit}>
                      <select name="score" onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <input
                        type="textarea"
                        name="comment"
                        onChange={handleChange}
                      ></input>
                      <button type="submit">enviar</button>
                    </form>
                  </div>
                </div>
              </>
            ) : null}
            {filter &&
              filter.map((e, i) => {
                return (
                  <div key={i} className={s.container_x}>
                    <div className={s.container_a}>
                      {e.sell ? (
                        <p
                          style={{
                            color: "red",
                            marginTop: "20px",
                            marginLeft: "15px",
                          }}
                        >
                          Seller
                        </p>
                      ) : (
                        <p
                          style={{
                            color: "green",
                            marginTop: "20px",
                            marginLeft: "15px",
                          }}
                        >
                          Buyer
                        </p>
                      )}
                      <p className={s.container_time}>
                        {e.createdAt
                          .slice(0, 10)
                          .replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1")}
                      </p>
                    </div>
                    <div className={s.container_b}>
                      <p>
                        Category: <b>{e.categoryName}</b>
                      </p>
                      <p>
                        Sub Category: <b>{e.subCategory}</b>
                      </p>
                      <p>
                        Country: <b>{e.country}</b>
                      </p>
                      <p>
                        payment:{" "}
                        {e.payment?.map((e, i) => {
                          return <b key={i}>{e} </b>;
                        })}
                      </p>
                      <p>
                        Shipping: <b>{e.shipping}</b>
                      </p>
                    </div>
                    <div>
                      <hr />
                      <b>{e.title}</b>
                      <p>{e.description}</p>
                      {e.image ? (
                        <img
                          src={e.image}
                          alt={e.title}
                          style={{ width: "30%", height: "30%" }}
                        />
                      ) : null}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <h1>aaaaaaaaaa</h1>
      )}
    </>
  );
};

export default ProfileUser;

// NO SE PUEDE BUSCAR UN PERFIL POR PARAMS PORQUE SE ROMPE

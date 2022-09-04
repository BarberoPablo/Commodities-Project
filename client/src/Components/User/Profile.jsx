import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./Users.module.css";
import { userPosts, createNewUser, getUserDetails, addFavorites, mailTous } from "../../Redux/Actions/Actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
//import Alert from 'react-bootstrap/Alert';

const Profile = () => {
  const { userPost } = useSelector((state) => state.users);
  const { user } = useAuth0();
  const userLog = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState({
    from: "commoditiesb2b@hotmail.com",
    to: user?.email,
    subject: "You just signed up on B2B commodities",
    text: `Hello ${user?.nickname}! Welcomes from the team of B2B.
    You are registered fully registered on our platform, you can browse freely on it. In order to make contacts with others you must buy a membership!
    We, the team of B2B Commodities are here to make your business grow. Thank you for choosing us.
    Feel free to contact us at commoditiesb2b@hotmail.com`
});

  const validate = (values) => {
    const errors = {};
    if (values.name.length > 30) {
      errors.name = "Must be 30 characters or less";
    }
    if (values.country.length > 20) {
      errors.country = "Must be 20 characters or less";
    }
    if (values.phone.length > 20) {
      errors.phone = "Must be 20 characters or less";
    }

    return errors;
  };

  useEffect(() => {
    dispatch(userPosts());
    if (user) {
      dispatch(userPosts());
      dispatch(getUserDetails(user?.email));
      //Aca iría la logica para poner los favoritos en la DB SIEMPRE Y CUANDO TENGA FAVORITOS:
      // Agregar favoritos a la base de datos:
      const favoritesToAdd = JSON.parse(window.localStorage.getItem("Fav"));
      if (favoritesToAdd.length > 0 && userLog?.id) {
        let favoritesIds = [];
        favoritesToAdd.forEach((post) => favoritesIds.push(post.id));
        dispatch(
          addFavorites({ favoritesToAdd: favoritesIds, userId: userLog.id })
        );
        window.localStorage.setItem("Fav", JSON.stringify([]));
      }
    }
  }, [dispatch, user, userLog.id]);

  useEffect(() => {
    setEmail({
      ...email,
      to: user?.email,
      text: `Hello ${user?.nickname}! Welcomes from the team of B2B.
      You are registered fully registered on our platform, you can browse freely on it. In order to make contacts with others you must buy a membership!
      We, the team of B2B Commodities are here to make your business grow. Thank you for choosing us.
      Feel free to contact us at commoditiesb2b@hotmail.com`
    })
  }, [user]);

  const formik = useFormik({
    initialValues: {
      name: "",
      country: "",
      phone: "",
      email: "",
      image: "",
    },
    validate,
    onSubmit: (values) => {
      values.name = values.name ? values.name : user.nickname;
      values.country = values.country ? values.country : userLog.country;
      values.phone = values.phone ? values.phone : userLog.phone;
      values.email = user.email;
      values.image = values.image ? values.image : user.picture;
      dispatch(createNewUser(values));
      alert("profile updated successfully")
      dispatch(
        mailTous(email)
      );
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    setActive(!active);
  };


  return (
    <div className={s.container}>
      {user ? (
        <>
          <div className={s.card}>
            <div className={s.user_photo} id="user_photo">
              <img
                src={userLog?.image ? userLog?.image : user?.picture}
                alt="a"
              />
              {userLog?.name ? <p>{userLog?.name}</p> : <p>{user?.nickname}</p>}
            </div>
            {!userLog?.country || !userLog.phone ? (
              <ToastContainer position="top-end">
                <Toast bg="warning">
                  <Toast.Header>
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt=""
                    />
                    <strong className="me-auto">Required!</strong>
                    <small className="text-muted">just now</small>
                  </Toast.Header>
                  <Toast.Body>
                    {" "}
                    Complete the required fields to validate your profile <br />{" "}
                    <b>*Email </b>and<b> *Phone</b>
                  </Toast.Body>
                </Toast>
              </ToastContainer>
            ) : null}
            <Button
              variant="outline-light"
              className={s.btn}
              size="sm"
              onClick={handleClick}
            >
              edit profile
            </Button>
          </div>

          <div className={!active ? `${s.oculto}` : `${s.active}`}>
            <form className={s.form} onSubmit={formik.handleSubmit}>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={userLog?.name ? userLog?.name : user?.nickname}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name ? (
                <div className={s.error}>{formik.errors.name}</div>
              ) : null}

              <input
                id="country"
                name="country"
                type="text"
                placeholder={
                  userLog?.country ? userLog?.country : "Complete country *"
                }
                onChange={formik.handleChange}
                value={formik.values.country}
              />
              {formik.errors.country ? (
                <div className={s.error}>{formik.errors.country}</div>
              ) : null}

              <input
                id="phone"
                name="phone"
                type="text"
                placeholder={
                  userLog?.phone ? userLog?.phone : "Complete phone *"
                }
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              {formik.errors.phone ? (
                <div className={s.error}>{formik.errors.phone}</div>
              ) : null}
              <input
                id="image"
                name="image"
                type="text"
                placeholder="image"
                onChange={formik.handleChange}
                value={formik.values.image}
              />
              {formik.errors.image ? <div>{formik.errors.image}</div> : null}
              <button type="submit">Confirm</button>
              
            </form>
          </div>

          <div className={s.containerPost}>
            {userPost &&
              userPost.map((e) => {
                return (
                  <div className={s.container_x}>
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
                        {e.payment?.map((e) => {
                          return <b>{e} </b>;
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
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Profile;

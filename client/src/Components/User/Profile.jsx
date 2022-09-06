import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./Users.module.css";
import {
  userPosts,
  createNewUser,
  getUserDetails,
  addFavorites,
  mailTous,
  getUser,
  getReviews,
  deleteReview,
} from "../../Redux/Actions/Actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { BsStarFill, BsStar } from "react-icons/bs";
import { BsFillExclamationCircleFill } from "react-icons/bs";

const Profile = () => {
  const [active, setActive] = useState(false);
  const { userPost } = useSelector((state) => state.users);
  const userLog = useSelector((state) => state.users.user);
  const contact = useSelector((state) => state.users.allUsers);
  const userLogReviews = useSelector((state) => state.reviews.Reviews);
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [email, setEmail] = useState({
    from: "commoditiesB2Bteam@hotmail.com",
    to: user?.email,
    subject: "You just signed up on B2B commodities",
    text: `Hello ${user?.nickname}! Welcomes from the team of B2B.
    You are registered fully registered on our platform, you can browse freely on it. In order to make contacts with others you must buy a membership!
    We, the team of B2B Commodities are here to make your business grow. Thank you for choosing us.
    
    Feel free to contact us at commoditiesB2Bteam@hotmail.com`
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
    if (user) {
      dispatch(userPosts());
      dispatch(getUserDetails(user?.email));
      const favoritesToAdd = JSON.parse(window.localStorage.getItem("Fav"));
      if (favoritesToAdd.length > 0 && userLog?.id) {
        let favoritesIds = [];
        favoritesToAdd.forEach((post) => favoritesIds.push(post.id));
        dispatch(
          addFavorites({ favoritesToAdd: favoritesIds, userId: userLog.id })
        );
        window.localStorage.setItem("Fav", JSON.stringify([]));
      }
      dispatch(getUser());
      dispatch(getReviews(userLog.id));
    }
  }, [dispatch, user, userLog.id]);

  useEffect(() => {
    setEmail({
      ...email,
      to: user?.email,
      text: `Hello ${user?.nickname}! Welcomes from the team of B2B.
      You are registered fully registered on our platform, you can browse freely on it. In order to make contacts with others you must buy a membership!
      We, the team of B2B Commodities are here to make your business grow. Thank you for choosing us.

      Feel free to contact us at commoditiesB2Bteam@hotmail.com`
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps

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
      alert("profile updated successfully");
      dispatch(mailTous(email));
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    setActive(!active);
  };
  const handleReport = (e, i) => {
    dispatch(deleteReview(userLog?.id, { display: "Report", position: i }));
    window.location.reload();
    
  };
  const contacts = contact.filter((e) => userLog.contactsIds?.includes(e.id));
  const [show, setShow] = useState(false);
  const [showA, setShowA] = useState(false);

  return (
    <div className={s.container}>
      {user ? (
        <>
          <div>
            <ToastContainer style={{ width: "23%", margin: "0 15px" }}>
              {contacts.map((e, i) => (
                <Toast
                  onClose={() => setShow(false)}
                  show={show}
                  animation={true}
                  style={{ minWidth: "100%", backgroundColor: "#151e22" }}
                  key={i}
                >
                  <Toast.Body>
                    <a
                      href={`/profile-user/${e.id}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      {e.name}
                    </a>
                  </Toast.Body>
                </Toast>
              ))}
            </ToastContainer>
          </div>

          <div className={s.card}>
            <div className={s.user_photo} id="user_photo">
              <img
                src={userLog?.image ? userLog?.image : user?.picture}
                alt="a"
              />
              {userLog?.name ? <p>{userLog?.name}</p> : <p>{user?.nickname}</p>}
              <Button
                onClick={() => setShow(!show)}
                variant="outline-light"
                size="sm"
                style={{ width: "70px", margin: "0 10%" }}
              >
                Contacts
              </Button>

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
                    <b>*Country </b>and<b> *Phone</b>
                  </Toast.Body>
                </Toast>
              </ToastContainer>
            ) : null}
            <div>
              <Button
                variant="outline-light"
                className={s.btn}
                size="sm"
                onClick={handleClick}
              >
                Edit profile
              </Button>

              <Button
                onClick={() => setShowA(!showA)}
                variant="outline-light"
                size="sm"
                className={s.btn}
              >
                Reviews
              </Button>
            </div>
          </div>
          <div>
            <ToastContainer
              style={{ width: "23%", margin: "5.2% 15px" }}
              position="top-end"
            >
              {userLogReviews.reviews?.map((e, i) => (
                <>
                  <Toast
                    onClose={() => setShowA(false)}
                    show={showA}
                    animation={true}
                    style={{ minWidth: "100%", backgroundColor: "#151e22" }}
                    key={i}
                  >
                    <Toast.Header style={{ color: "#151e22" }}>
                      {e.name}
                      {e.score === "1" ? (
                        <strong className="me-auto">
                          <BsStarFill /> <BsStar /> <BsStar /> <BsStar />{" "}
                          <BsStar />
                        </strong>
                      ) : null}
                      {e.score === "2" ? (
                        <strong className="me-auto">
                          <BsStarFill /> <BsStarFill /> <BsStar /> <BsStar />{" "}
                          <BsStar />
                        </strong>
                      ) : null}
                      {e.score === "3" ? (
                        <strong className="me-auto">
                          <BsStarFill /> <BsStarFill /> <BsStarFill />{" "}
                          <BsStar /> <BsStar />
                        </strong>
                      ) : null}
                      {e.score === "4" ? (
                        <strong className="me-auto">
                          <BsStarFill /> <BsStarFill /> <BsStarFill />{" "}
                          <BsStarFill /> <BsStar />
                        </strong>
                      ) : null}
                      {e.score === "5" ? (
                        <strong className="me-auto">
                          <BsStarFill /> <BsStarFill /> <BsStarFill />{" "}
                          <BsStarFill /> <BsStarFill />
                        </strong>
                      ) : null}
                        <BsFillExclamationCircleFill onClick={(report) => handleReport(report, i)} style={{cursor: 'pointer'}}/>
                    </Toast.Header>
                    <Toast.Body>{e.comment}</Toast.Body>
                  </Toast>
                </>
              ))}
            </ToastContainer>
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
              userPost.map((e, i) => {
                return (
                  <div className={s.container_x} key={i}>
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
                    <b>{e.title}</b>
                    <hr />
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
                        payment:
                        <div className={s.payment}>
                          {e.payment?.map((c, i) => {
                            return <b key={i}>{c}</b>;
                          })}
                        </div>
                      </p>
                      <p>
                        Shipping: <b>{e.shipping}</b>
                      </p>
                    </div>
                    <hr />
                    <div className={s.postProfile}>
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

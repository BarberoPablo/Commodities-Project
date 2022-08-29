import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./Users.module.css";
import {
  userPosts,
  createNewUser,
  getUserDetails,
} from "../../Redux/Actions/Actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};
  if (values.name.length > 30) {
    errors.name = "Must be 30 characters or less";
  }
  if (!values.country) {
    errors.country = "*";
  } else if (values.country.length > 20) {
    errors.country = "Must be 20 characters or less";
  }
  if (!values.phone) {
    errors.phone = "*";
  } else if (values.phone.length > 20) {
    errors.phone = "Must be 20 characters or less";
  }

  return errors;
};

const Profile = () => {
  const { userPost } = useSelector((state) => state.users);
  const { user } = useAuth0();
  const userLog = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  useEffect(() => {
    dispatch(userPosts());
    if (user) {
      dispatch(userPosts());
      dispatch(getUserDetails(user.email));
    }
  }, [dispatch, user]);

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
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    setActive(!active);
  };

  return (
    <div>
      {user ? (
        <>
          <div className={`${s.frame}`}>
            <div className={s.card}>
              <div className={s.details}>
                <div
                  className={`${s.user_photo} ${s.horizontal_center}`}
                  id="user_photo"
                >
                  <img
                    src={userLog.image ? userLog.image : user.picture}
                    alt="a"
                  />
                </div>
                {!userLog.country ? (
                  <p>Complete the required fields to validate your profile</p>
                ) : null}

                <button className={s.boton} onClick={handleClick}>
                  modify data
                </button>
                <div className={!active ? `${s.oculto}` : ``}>
                  <form className={s.form} onSubmit={formik.handleSubmit}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    {formik.errors.name ? (
                      <div>{formik.errors.name}</div>
                    ) : null}

                    <input
                      id="country"
                      name="country"
                      type="text"
                      placeholder="Country"
                      onChange={formik.handleChange}
                      value={formik.values.country}
                    />
                    {formik.errors.country ? (
                      <div>{formik.errors.country}</div>
                    ) : null}

                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="Phone"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                    />
                    {formik.errors.phone ? (
                      <div>{formik.errors.phone}</div>
                    ) : null}

                    <input
                      id="image"
                      name="image"
                      type="text"
                      placeholder="image"
                      onChange={formik.handleChange}
                      value={formik.values.image}
                    />
                    {formik.errors.image ? (
                      <div>{formik.errors.image}</div>
                    ) : null}
                    <button type="submit">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className={s.containerPost}>
            {userPost &&
              userPost.map((e) => {
                return (
                  <div className={s.container}>
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
                      {e.image ?
                      <img src={e.image} alt={e.title} style={{width: '30%', height: '30%'}}/>
                      : null}
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <h1>...loading</h1>
      )}
    </div>
  );
};

export default Profile;

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
  if (values.name.length > 20) {
    errors.name = "Must be 15 characters or less";
  }
  if (values.country.length > 15) {
    errors.country = "Must be 15 characters or less";
  }
  if (values.phone.length > 15) {
    errors.phone = "Must be 15 characters or less";
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
      dispatch(userPosts())
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
      values.name = values.name ? values.name : userLog.name;
      values.country = values.country ? values.country : userLog.country;
      values.phone = values.phone ? values.phone : userLog.phone;
      values.email = user.email;
      values.image = values.image ? values.image : user.picture;
      //dispatch(userLogin(values));
      dispatch(createNewUser(values));
      // console.log(JSON.stringify(values))
      // alert("user creado correctamente con los datos: " + JSON.stringify(values));
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
                <button className={s.btnactive} onClick={handleClick}>
                  🖋️
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
                  <div className={s.post}>
                    <div className={s.info}>
                      <p>Category: {e.categoryName}</p>
                      <p>Sub Category: {e.subCategory}</p>
                      <p>Country: {e.country}</p>
                      <p>Payment: {e.payment}</p>
                      <p>Shipping: {e.shipping}</p>
                    </div>
                    <b>{e.title}</b>
                    <p>{e.description}</p>
                    <hr />
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

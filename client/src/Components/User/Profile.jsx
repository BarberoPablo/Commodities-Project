import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./Users.module.css";
import { userPosts } from "../../Redux/Actions/Actions";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { posts } = useSelector((state) => state.posts);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    image: "",
  });

  const { user } = useAuth0();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userPosts());
  }, [dispatch, user]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      email: user.email,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      email: user.email,
      [e.target.name]: e.target.value,
    });
    console.log(userData);
  };
  // const handleActive = (e) => {
  //   let info = document.getElementById("user_value")
  //   info.p = e.target.id;
  // };
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
                    src={
                      user.picture
                        ? user.picture
                        : "https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg"
                    }
                    alt="a"
                  />
                </div>

                {/* {userData.name !== "" ? (
                  <p id="user_value">{userData.name}</p>
                ) : userData.country !== "" ? (
                  <p id="user_value">{userData.country}</p>
                ) : (
                  <p>...</p>
                )}
                <ul
                  className={`${s.values_list} ${s.horizontal_center}`}
                  id="values_list"
                >
                  <li
                    name="name"
                    data-label="name"
                    id={userData.name !== "" ? userData.name : user.name}
                    //onClick={handleActive}
                    className={userData !== user.name ? `${s.active}` : ""}
                  ></li>
                  <li
                    data-label="email"
                    id={user.email}
                    //onClick={(e) => handleActive(e)}
                    className={userData === user.email ? `${s.active}` : ""}
                  ></li>
                  <li
                    name="country"
                    data-label="location"
                    id={userData.country}
                    //onClick={(e) => handleActive(e)}
                    className={userData.country !== "" ? `${s.active}` : ""}
                  ></li>
                  <li
                    data-label="phone"
                    id={userData.phone}
                    //onClick={(e) => handleActive(e)}
                    className={userData === userData.phone ? `${s.active}` : ""}
                  ></li>
                </ul> */}
              </div>

              <div className={s.containerForm}>
                <form className={s.form} onSubmit={handleSubmit}>
                  <input
                    name="name"
                    type="text"
                    placeholder="name"
                    onChange={handleChange}
                  ></input>
                  <input
                    name="country"
                    type="text"
                    placeholder="country"
                    onChange={handleChange}
                  ></input>
                  <input
                    name="phone"
                    type="text"
                    placeholder="phone"
                    onChange={handleChange}
                  ></input>
                  <input
                    name="image"
                    type="text"
                    placeholder="image"
                    onChange={handleChange}
                  ></input>
                  <button type="submit">submit</button>
                </form>
              </div>
            </div>
          </div>
          <div className={s.containerPost}>
            {posts &&
              posts.map((e) => {
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
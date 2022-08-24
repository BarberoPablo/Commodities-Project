import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./Users.module.css";
import { userPosts } from "../../Redux/Actions/Actions";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { posts } = useSelector((state) => state.posts);
  //const [users, setUser] = useState("");

  const { user } = useAuth0();

  const [input, setInput] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    image: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userPosts());
  }, [dispatch, user]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      name: input.name ? input.name : user.name,
      email: user.email,
    });
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
                    src={
                      user.picture
                        ? user.picture
                        : "https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg"
                    }
                    alt="a"
                  />
                </div>
                {user ? (
                  <p id="user_value">{input.name ? input.name : user.name}</p>
                  
                ) : null}
                {console.log(user)}
                <ul
                  className={`${s.values_list} ${s.horizontal_center}`}
                  id="values_list"
                >
                  <li
                    //onClick={(e) => handleChange(e)}
                    //id={posts.userId}
                    data-title="Hi, My name is"
                    //data-value={posts.userId}
                    data-label="name"
                    //className={user === posts.userId ? `${s.active}` : ""}
                    // className={s.active}
                  ></li>
                  <li
                    data-title="My email address is"
                    //id={e.email}
                    //onClick={(e) => handleChange(e)}
                    //data-value={e.email}
                    data-label="email"
                    data-caps="false"
                    //className={user === e.email ? `${s.active}` : ""}
                  ></li>
                  <li
                    //onClick={(e) => handleChange(e)}
                    //id={e.location}
                    data-title="My address is"
                    //data-value={e.location}
                    data-label="location"
                    //className={user === e.location ? `${s.active}` : ""}
                  ></li>
                  <li
                    //onClick={(e) => handleChange(e)}
                    //id={e.phone}
                    data-title="My phone number is"
                    //data-value={e.phone}
                    data-label="phone"
                    //className={user === e.phone ? `${s.active}` : ""}
                  ></li>
                </ul>
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
                    name="phone"
                    type="text"
                    placeholder="phone"
                    onChange={handleChange}
                  ></input>
                  <input
                    name="country"
                    type="text"
                    placeholder="country"
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

import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./Users.module.css";
import { userPosts } from "../../Redux/Actions/Actions";

const Profile = () => {
  const { posts } = useSelector((state) => state.posts);
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userPosts());
  }, [dispatch]);

  const handleChange = (e) => {
    setUser(e.target.id);
  };

  return (
    <div>
      <div className={`${s.frame}`}>
        <div className={s.card}>
          <div className={s.details}>
            <div
              className={`${s.user_photo} ${s.horizontal_center}`}
              id="user_photo"
            >
              <img
                src="https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg"
                alt="a"
              />
            </div>
            <p id="user_value">user</p>
          </div>

          <ul
            className={`${s.values_list} ${s.horizontal_center}`}
            id="values_list"
          >
            <li
              onClick={(e) => handleChange(e)}
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
              onClick={(e) => handleChange(e)}
              //data-value={e.email}
              data-label="email"
              data-caps="false"
              //className={user === e.email ? `${s.active}` : ""}
            ></li>
            <li
              onClick={(e) => handleChange(e)}
              //id={e.location}
              data-title="My address is"
              //data-value={e.location}
              data-label="location"
              //className={user === e.location ? `${s.active}` : ""}
            ></li>
            <li
              onClick={(e) => handleChange(e)}
              //id={e.phone}
              data-title="My phone number is"
              //data-value={e.phone}
              data-label="phone"
              //className={user === e.phone ? `${s.active}` : ""}
            ></li>
          </ul>
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
                <hr/>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Profile;

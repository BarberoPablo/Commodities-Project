import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./Favorites.module.css";
import {
  getUserDetails,
  getPost,
  addFavorites,
} from "../../../Redux/Actions/Actions";
import { useAuth0 } from "@auth0/auth0-react";

const Favorites = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(window.localStorage.getItem("Fav"))
  );
  const [favoritesDb, setFavoritesDb] = useState([]);
  const { user } = useAuth0();
  const userLog = useSelector((state) => state.users.user);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [render, setRender] = useState();

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch, user, userLog.id, render]);

  useEffect(() => {
    if (user) {
      // Carga la const userLog con los datos del usuario
      dispatch(getUserDetails(user.email));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    // Si se cargó el usario busco sus posteos
    if (userLog.id) {
      // Carga la const userLog con los datos del usuario
      const favoritePosts = posts.filter((post) =>
        userLog.favoritesIds.includes(post.id)
      );
      setFavoritesDb(favoritePosts);
      console.log("favvvv", favoritePosts);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLog]);

  const handleDelete = ({ e }) => {
    const posts = favorites.filter((post) => post.id !== e.id);
    setFavorites(posts);
    //No puedo hacer: window.localStorage.setItem("Fav", favorites); porque esta un paso atras y el ultimo no lo elimina
    window.localStorage.setItem("Fav", JSON.stringify(posts));
  };

  const handleDeleteDb = (postId) => {
    console.log("@", userLog.id);
    console.log("@@", postId);
    const posts = favoritesDb.filter((post) => post.id !== postId);
    setFavoritesDb(posts);
    const eliminatePost = {
      userId: userLog.id,
      postId: postId,
    };
    dispatch(addFavorites(eliminatePost));
    setRender(render + 1);
  };

  return (
    <div className={s.container}>
      {/*
      Si está logeado muestro lo de la DB 
        -> Si hay favoritos los muestro
        -> Si no hay favoritos muestro "You have no favorites"
      Si no está logeado muestro el localStorage
        -> Si hay favoritos los muestro
        -> Si no hay favoritos muestro "You have no favorites"*/}

      {Object.keys(userLog).length !== 0 ? (
        favoritesDb.length > 0 ? (
          favoritesDb.map((post, index) => (
            // Si el los id de los favoritos incluyen al del post, lo renderizo:
            <div key={index} className={s.local_fav}>
              <div className={s.local_fav_A}>
                <a href={"/profile-user/"+ post.userId} style={{textDecoration:'none'}}>
                  <h1 style={{ backgroundColor: "transparent" }}>{post.title}</h1>
                </a>
                <button
                  className={s.local_fav_A_btn}
                  onClick={() => handleDeleteDb(post.id)}
                >
                  x
                </button>
              </div>
              <div>
                <p>{post.categoryName}</p>
                <p>
                  Sub Category: <b>{post.subCategory}</b>
                </p>
              </div>
              <div>
                <p>{post.country}</p>
                <p>
                  Payment:{" "}
                  {post.payment.map((e, i) => {
                    return <b key={i}> {e}</b>;
                  })}
                </p>
                <p>
                  Shipping: <b>{post.shipping}</b>
                </p>
              </div>
              <p>{post.description}</p>
            </div>
          ))
        ) : (
          <h1>You have no favorites</h1>
        )
      ) : favorites?.length > 0 ? (
        favorites.map((e, index) => (
          <div key={index} className={s.local_fav}>
            <div className={s.local_fav_A}>
              <a href={"/profile-user/"+ e.userId} style={{textDecoration:'none'}}>
                <h1 style={{ backgroundColor: "transparent" }}>{e.title}</h1>
              </a>
              <button onClick={() => handleDelete({ e })}  className={s.local_fav_A_btn}>x</button>
            </div>
            <div>
              <p>{e.categoryName}</p>
              <p>
                Sub Category: <b>{e.subCategory}</b>
              </p>
            </div>
            <div>
              <p>{e.country}</p>
              <p>
                Payment:{" "}
                {e.payment.map((e, i) => {
                  return <b key={i}> {e}</b>;
                })}
              </p>
              <p>
                Shipping: <b>{e.shipping}</b>
              </p>
            </div>
            <p>{e.description}</p>
          </div>
        ))
      ) : (
        <h1>You have no favorites</h1>
      )}
    </div>
  );
};

export default Favorites;

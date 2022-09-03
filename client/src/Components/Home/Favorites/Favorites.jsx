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
            <div key={index}>
              <h1>{post.title}</h1>
              <p>{post.categoryName}</p>
              <button onClick={() => handleDeleteDb(post.id)}>x</button>
            </div>
          ))
        ) : (
          <h1>You have no favorites</h1>
        )
      ) : favorites?.length > 0 ? (
        favorites.map((e, index) => (
          <div key={index}>
            <h1>{e.title}</h1>
            <p>{e.categoryName}</p>
            <button onClick={() => handleDelete({ e })}>x</button>
          </div>
        ))
      ) : (
        <h1>You have no favorites</h1>
      )}
    </div>
  );
};

export default Favorites;

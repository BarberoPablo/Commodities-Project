import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./Favorites.module.css";
import { getUserDetails } from "../../../Redux/Actions/Actions";
import { useAuth0 } from "@auth0/auth0-react";

const Favorites = () => {
  const [favorites, setFavorites] = useState(JSON.parse(window.localStorage.getItem("Fav")));
  const { user } = useAuth0();
  const userLog = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("connected", userLog);
    console.log("auth", user);
    if (user) {
      dispatch(getUserDetails(user.email));
    }
  }, [dispatch, user, userLog.id]);

  const handleDelete = ({ e }) => {
    const posts = favorites.filter((post) => post.id !== e.id);
    setFavorites(posts);
    //No puedo hacer: window.localStorage.setItem("Fav", favorites); porque esta un paso atras y el ultimo no lo elimina
    window.localStorage.setItem("Fav", JSON.stringify(posts));
  };

  return (
    <div className={s.container}>
      {/* Si esta logeado cargo los favoritesIds */}
      {/* Hacer ruta en el back que me traiga los posts en vez de los ids */}
      {userLog.favoritesIds ? (
        userLog.favoritesIds?.map((post, index) => <div key={index}> {post} </div>)
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

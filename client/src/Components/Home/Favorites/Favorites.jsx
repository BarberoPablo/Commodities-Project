import React, { useEffect, useState } from "react";
import s from "./Favorites.module.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState(JSON.parse(window.localStorage.getItem("Fav")));

  const handleDelete = ({ e }) => {
    const posts = favorites.filter((post) => post.id !== e.id);
    setFavorites(posts);
    //No puedo hacer: window.localStorage.setItem("Fav", favorites); porque esta un paso atras y el ultimo no lo elimina
    window.localStorage.setItem("Fav", JSON.stringify(posts));
  };

  return (
    <div className={s.container}>
      {favorites?.length > 0 ? (
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

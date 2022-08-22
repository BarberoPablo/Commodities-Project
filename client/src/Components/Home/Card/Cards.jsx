import React from "react";
import CardDetail from "./CardDetail";
import s from "./Card.module.css"
const Cards = ({ posts }) => {

  return (
    <div className={s.container}>
      {posts?.map((e, i) => {
        return <CardDetail e={e} key={i} />;
      })}
    </div>
  );
};

export default Cards;

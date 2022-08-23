import React from "react";
import CardDetail from "./CardDetail";
import s from "./Card.module.css"

const Cards = ({ currentPost }) => {
  return (
    <div className={s.container}>
      {currentPost?.map((e, i) => {
        return <CardDetail e={e} key={i} />;
      })}
    </div>
  );
};

export default Cards;

import React from "react";
import s from "./Card.module.css";
import CardDetail from "./CardDetail";

const Cards = ({ posts }) => {

  return (
    <div className={s}>
      {posts?.map((e, i) => {
        return <CardDetail e={e} key={i} />;
      })}
    </div>
  );
};

export default Cards;

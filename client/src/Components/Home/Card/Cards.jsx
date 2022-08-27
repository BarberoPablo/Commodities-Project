import React from "react";
import CardDetail from "./CardDetail";
import s from "./Card.module.css"
import { useSelector } from "react-redux";

const Cards = ({ currentPost }) => {
  const { allUsers } = useSelector((state) => state.users);

  return (
    <div className={s.container}>
      {currentPost?.map((e, i) => {
        return <CardDetail e={e} key={i} user={allUsers.find((c) => e.userId === c.id)}/>;
      })}
    </div>
  );
};

export default Cards;

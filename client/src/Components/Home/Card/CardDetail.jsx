import React from "react";
import s from "./Card.module.css";
const CardDetail = ({ e }) => {
  return (
    <div className={s.body}>
      <div className={s.container}>
        <div className={s.cardContainer}>
          <div className={s.user}>
            <div className={s.userDate}>
              {/* <div className={s.imgProfile}>
                <img
                  src="https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg"
                  alt="profile"
                />
              </div> */}
              <h4>{e.name}</h4>
              <p>{e.title}</p>
              <p>{e.country}</p>
              <p>{e.categoryName}</p>
              <p className={s.fecha}>{e.createdAt}</p>
            </div>
          </div>
          <div className={s.post}>
            <p>{e.description}</p>
          </div>
        </div>
        <div className={s.type}>
          <div className={s.typeData}>
            {e.sell ? (
              <p style={{ backgroundColor: "red" }}>Seller</p>
            ) : (
              <p style={{ backgroundColor: "green" }}>Buyer</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardDetail;

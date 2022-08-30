import s from "./Card.module.css";
import Alert from 'react-bootstrap/Alert';
import { useState } from "react";

const CardDetail = ({ e, user, setFav, Fav }) => {

  const [active,setActive] = useState(false)

  const handleClick = (event) => {
    const filter = Fav.filter((posts) => posts.id === e.id);
    if (filter.length > 0 ) {
      alert('no')
    } else {
      setFav([...Fav, e]);
      setActive(true);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.container_a}>
        <div className={s.container_logo}>
          <img
            src={
              user?.image
                ? user?.image
                : "https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg"
            }
            alt="profile"
          />
        </div>
        <b>{user?.name}</b>
        {e.sell ? (
          <p style={{ color: "red", marginTop: "20px", marginLeft: "15px" }}>
            Seller
          </p>
        ) : (
          <p style={{ color: "green", marginTop: "20px", marginLeft: "15px" }}>
            Buyer
          </p>
        )}
        <p className={s.container_time}>
          {e.createdAt
            .slice(0, 10)
            .replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1")}
        </p>
      </div>
      <div className={s.container_b}>
        <p>
          Category: <b>{e.categoryName}</b>
        </p>
        <p>
          Sub Category: <b>{e.subCategory}</b>
        </p>
        <p>
          Country: <b>{e.country}</b>
        </p>
        <p>
          payment:{" "}
          {e.payment?.map((e) => {
            return <b>{e} </b>;
          })}
        </p>
        <p>
          Shipping: <b>{e.shipping}</b>
        </p>
      </div>
      <div>
        <hr />
        <b>{e.title}</b>
        <p>{e.description}</p>
        <button onClick={() => handleClick(e)}>❤</button>
      </div>
      {active ? (
        <Alert variant="primary" onClose={() => setActive(true)}>
          Successfully saved.{" "}
          <Alert.Link href="/favorites">Ir a favoritos</Alert.Link>.
        </Alert>
      ) : null}
    </div>
  );
};

export default CardDetail;

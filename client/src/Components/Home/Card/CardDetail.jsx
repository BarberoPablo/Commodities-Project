import s from "./Card.module.css";
const CardDetail = ({ e }) => {
  return (
    <div className={s.card}>
      <div className={s.userDate}>
        <div className={s.imgProfile} >
          <img
            src="https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg"
            alt="profile"
          />
        </div>
        <b>user</b>
        <p>
          {e.createdAt
            .slice(0, 10)
            .replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1")}
        </p>
      </div>
      <div className={s.post}>
        <div className={s.info}>
          <p>Category: {e.categoryName}</p>
          <p>Sub Category: {e.subCategory}</p>
          <p>Country: {e.country}</p>
          <p>Payment: {e.payment}</p>
          <p>Shipping: {e.shipping}</p>
        </div>
        <hr />
        <b>{e.title}</b>
        <p>{e.description}</p>
      </div>
    </div>
  );
};

export default CardDetail;

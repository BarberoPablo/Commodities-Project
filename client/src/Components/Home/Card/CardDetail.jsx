import s from "./Card.module.css";
const CardDetail = ({ e, user }) => {
  return (
    <div className={s.card}>
      <div className={s.userDate}>
        <div className={s.imgProfile}>
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
        <p>
          {e.createdAt
            .slice(0, 10)
            .replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1")}
        </p>
      </div>
      <div className={s.post}>
        <div className={s.info}>
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
        <hr />
        <b>{e.title}</b>
        <p>{e.description}</p>
      </div>
    </div>
  );
};

export default CardDetail;

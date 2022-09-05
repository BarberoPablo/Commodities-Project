import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Card.module.css";
import { Link } from "react-router-dom";
import ToastHide from "./ToastHide";
import { addFavorites, getUserDetails } from "../../../Redux/Actions/Actions";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const CardDetail = ({ e, user, setFav, Fav }) => {
  const myUser = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const userLog = useSelector((state) => state.users.user);
  const userAuth0 = useAuth0().user;

  useEffect(() => {
    if (userAuth0) {
      // Carga la const userLog con los datos del usuario
      dispatch(getUserDetails(userAuth0.email));
    }
  }, [userAuth0]);
  const handleClick = (event) => {
    // Si hay un usuario conectado, los favorites se agregan a la DB y si no, al localstorage
    if (Object.keys(userLog).length !== 0) {
      const favorites = {
        userId: userLog.id,
        postId: e.id,
      };
      dispatch(addFavorites(favorites));
    } else {
      const favFiltered = Fav.filter((posts) => posts.id === e.id);
      if (favFiltered.length > 0) {
        return;
      } else {
        setFav([...Fav, e]);
      }
    }
    setShow(true);
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

        <Link
          to={`/profile-user/` + e.userId}
          style={{ color: "black", textDecoration: "none" }}
        >
          <b>{user?.name}</b>
        </Link>

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
          {"        "}
          {myUser?.country ? (
            <OverlayTrigger
              trigger="hover"
              placement="right"
              overlay={
                <Popover>
                  <Popover.Header>report post</Popover.Header>
                </Popover>
              }
            >
              <Link
                to={`/report/${e?.id}/${myUser?.id}`}
                alt="report"
                style={{ textDecoration: "none", color: "gray", margin: "5px" }}
              >
                <BsFillExclamationCircleFill />
              </Link>
            </OverlayTrigger>
          ) : null}
        </p>
      </div>
      <div className={s.tittle}>
      <b>{e.title}</b>
        <ToastHide
          show={show}
          setShow={setShow}
          handleClick={handleClick}
          e={e}
          Fav={Fav}
          className={s.heart}
        />
        </div>
        <hr />
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
          Payment:{" "}
          {e.payment.map((e, i) => {
            return <b key={i}> {e}</b>;
          })}
        </p>
        <p>
          Shipping: <b>{e.shipping}</b>
        </p>
        
      </div>
      <div>
      <hr />
        <p>{e.description}</p>
      </div>
    </div>
  );
};

export default CardDetail;

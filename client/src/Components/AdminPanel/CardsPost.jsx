import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import s from "../Home/Card/Card.module.css";
import { Link } from "react-router-dom";
import { banPost } from "../../Redux/Actions/Actions";



const CardsPost = ({ currentPost }) => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.users);
  const user = allUsers
  
  function handleBan(e){
dispatch(banPost(e.id, 9, "Ban"))
console.log(e)
  }

  return (
  
    <Container fluid="md" style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <Row style={{width:'80%'}} >
        {currentPost?.map((e, i) => {
          return (
            <div className={s.container}>
<div className={s.container_a}>
        <div className={s.container_logo}>
          <img
            src={
              user.find((c) => e.userId === c.id)?.image
                ? user.find((c) => e.userId === c.id)?.image
                : "https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg"
            }
            alt="profile"
          />
        </div>

        <Link to={`/profile-user/` + e.userId}>
          <b>{user.find((c) => e.userId === c.id)?.name}</b>
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
        <b>{e.title}</b>
        <p>{e.description}</p>
      </div>
<p>{e.display? "NOT BANNED":"BANNED"}</p>
            <button onClick={()=>handleBan(e)}>DELETE POST</button>
          </div>
          );
        })}
      </Row>
    
    </Container>

  );
};

export default CardsPost;

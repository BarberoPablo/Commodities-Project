import React from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import s from "../Home/Card/Card.module.css";


const Cards = ({ currentPost }) => {
  const { allUsers } = useSelector((state) => state.users);
  const user = allUsers

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
            </div>
            
            <button>DELETE POST</button>
          </div>
          );
        })}
      </Row>
    
    </Container>

  );
};

export default Cards;

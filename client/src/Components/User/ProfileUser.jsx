import { React, useState } from "react";
import { useSelector } from "react-redux";
import s from "./Users.module.css";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const ProfileUser = () => {
  const { profileUser } = useSelector((state) => state.users);
  const { posts } = useSelector((state) => state.posts);
  const filter = posts.filter((e) => e.userId === profileUser.id);
  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {profileUser ? (
        <div className={s.container}>
          <div className={s.card}>
            <div className={s.user_photo} id="user_photo">
              <img src={profileUser.image} alt="a" />
              <p>{profileUser.name}</p>
            </div>
            <Button
              variant="warning"
              className={s.btn}
              size="sm"
              onClick={toggleShowA}
            >
              Contact
            </Button>
            <ToastContainer position="bottom-center">
              <Toast show={showA} onClose={toggleShowA} bg="secondary">
                <Toast.Body>
                  By accepting, one of your contacts will be deducted, are you sure?
                </Toast.Body>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={toggleShowA}
                >
                  ok
                </Button>
              </Toast>
            </ToastContainer>
          </div>
          <div className={s.containerPost}>
            {filter &&
              filter.map((e) => {
                return (
                  <div className={s.container_x}>
                    <div className={s.container_a}>
                      {e.sell ? (
                        <p
                          style={{
                            color: "red",
                            marginTop: "20px",
                            marginLeft: "15px",
                          }}
                        >
                          Seller
                        </p>
                      ) : (
                        <p
                          style={{
                            color: "green",
                            marginTop: "20px",
                            marginLeft: "15px",
                          }}
                        >
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
                      <b>{e.title}</b>
                      <p>{e.description}</p>
                      <hr />
                      {e.image ? (
                        <img
                          src={e.image}
                          alt={e.title}
                          style={{ width: "30%", height: "30%" }}
                        />
                      ) : null}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <h1>aaaaaaaaaa</h1>
      )}
    </>
  );
};

export default ProfileUser;

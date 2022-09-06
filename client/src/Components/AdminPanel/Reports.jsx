import {React,  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import s from "../Home/Card/Card.module.css";
import { getReviews, reportTo, deleteReview } from "../../Redux/Actions/Actions";
import { Link } from "react-router-dom";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";


export default function Reports( { currentPost }, {allCountries}) {
  const { allUsers } = useSelector((state) => state.users);
  const user = allUsers
  const [showA, setShowA] = useState(false);

  const dispatch = useDispatch();
  const { Reviews } = useSelector((state) => state.reviews);
  const filtrado = currentPost.filter( e => e.reportedIds.length > 0)
  useEffect(() => {
    dispatch(getReviews("All"));
    //console.log(currentPost)
  }, [dispatch]);

  function handleBan(e){
    dispatch(reportTo(e.id, 9, {event:"Ban"}))
    console.log(e)
      }
  function handleDismiss(e){
    dispatch(reportTo(e.id, 9, {event:"Dismiss"}))
    console.log(e)
      }



  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = (userId, position) => {
      setShowA(!showA);
dispatch(deleteReview(userId, {display: "Erase", position: `${position}`}))
  };


  return (
    <div>
      <h2>Reports</h2>
      {Reviews?.map((r)=>{
        return(r.reviews.length>0 ?
          <div key={filtrado.id}>
            {r.reviews?.map((s) => {
              return( s.idReport.length>0?
                <div key={filtrado.id}>
                  <p>reviews for {allUsers.find(u=> u.id===r.userId)?.name}</p>
                  <p>Comment:{s.comment}</p> 
                  <p>score:{s.score}</p> 
                  <p>Review By:{allUsers.find(u=> u.id===s.idReviewer)?.name}</p>
                  <button onClick={toggleShowA}>DELETE REVIEW</button>

<ToastContainer position="middle-center">
<Toast show={showA} onClose={toggleShowA} bg="secondary">
  <Toast.Body>
  You are about to definitely erase this review. Are you sure?
  </Toast.Body>
  <Button variant="success" size="sm" onClick={()=>toggleShowB( r.userId, r.reviews.indexOf(s))}>
    Accept
  </Button>
  <Button
    style={{ margin: "10px" }}
    variant="danger"
    size="sm"
    onClick={toggleShowA}
  >
    Cancel
  </Button>
</Toast>
</ToastContainer>
                  { s.idReport.map((r)=>{
                    return(
                      // eslint-disable-next-line eqeqeq
                      <p>Reported By:{allUsers.find(u=> u.id == r)?.name} </p>
                    )
                  })}  
                </div>
                :null
              )
            })}
          </div>
          : null
        )
      })}
      <div>
        <h2>Reviews Reports</h2>
      </div>
      <Container fluid="md" style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <Row style={{width:'80%'}} >
          {filtrado?.map((e, i) => {
            return (
              <div className={s.container}>
                <div className={s.container_a}>
                  <div className={s.container_logo} key={filtrado.id}>
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
                  {e.sell 
                    ? (<p style={{ color: "red", marginTop: "20px", marginLeft: "15px" }}>
                        Seller
                      </p>)
                    : (<p style={{ color: "green", marginTop: "20px", marginLeft: "15px" }}>
                        Buyer
                      </p>)
                  }
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
                <button onClick={()=>handleDismiss(e)}>Dismiss Report</button>
                <button onClick={()=>handleBan(e)}>Delete Post</button>
              </div>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

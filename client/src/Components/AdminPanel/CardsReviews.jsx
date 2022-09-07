import {React,  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, deleteReview } from "../../Redux/Actions/Actions";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import x from "./Admin.module.css"
import { BsStarFill, BsStar } from "react-icons/bs";

export default function CardsReview({allUsers}) {

  const dispatch = useDispatch();
  const { Reviews } = useSelector((state) => state.reviews);
  const [showA, setShowA] = useState(false);

  useEffect(() => {
    dispatch(getReviews("All"));
  }, [dispatch]);


    //idReview,s.idReviewer,

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = (userId, position) => {
      setShowA(!showA);
dispatch(deleteReview(userId, {display: "Erase", position: `${position}`}))
  };

  return (
    <div>
      <h2>reviews</h2>
      {Reviews?.map((r)=>{ 
        return(
          r.reviews.length>0 ?
            <div className={x.cardB}>
              <h3>Reviews for : {allUsers.find(u=> u.id===r.userId)?.name}</h3>
              {r.reviews?.map((s) => {
              return(
                <div className={x.cardR}>
                  
                  {/* <h6>Score: {s.score}</h6>  */}
            {s.score == '1' ? <strong className="me-auto"><BsStarFill/> <BsStar/> <BsStar/> <BsStar/> <BsStar/></strong> : null}
            {s.score == '2' ? <strong className="me-auto"><BsStarFill/> <BsStarFill/> <BsStar/> <BsStar/> <BsStar/></strong> : null}
            {s.score == '3' ? <strong className="me-auto"><BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStar/> <BsStar/></strong> : null}
            {s.score == '4' ? <strong className="me-auto"><BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStar/></strong> : null}
            {s.score == '5' ? <strong className="me-auto"><BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStarFill/></strong> : null}
            <h6>Comment: {s.comment}</h6> 
                  <p>Review By:{allUsers.find(u=> u.id===s.idReviewer).name}</p>
{/* onClick={} */}
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
                </div>
              )  
              })}
            </div>
          : null
        )          
      })}
    </div>
  );
};
  
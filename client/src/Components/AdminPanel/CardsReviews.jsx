import {React,  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, deleteReview } from "../../Redux/Actions/Actions";


export default function CardsReview({allUsers}) {

  const dispatch = useDispatch();
  const { Reviews } = useSelector((state) => state.reviews);
  
  useEffect(() => {
    dispatch(getReviews("All"));
  }, [dispatch]);

  function handleDeleteReview(userId, position){
    dispatch(deleteReview(userId, {display: "Erase", position: `${position}`}))
  }
    //idReview,s.idReviewer,

  return (
    <div>
      <h2>reviews</h2>
      {Reviews?.map((r)=>{ 
        return(
          r.reviews.length>0 ?
            <div>
              <h3>Reviews for : {allUsers.find(u=> u.id===r.userId)?.name}</h3>
              {r.reviews?.map((s) => {
              return(
                <div>
                  <h6>Comment: {s.comment}</h6> 
                  <h6>Score: {s.score}</h6> 
                  {/* <p>Review By:{allUsers.find(u=> u.id===s.idReviewer).name}</p> */}
                  <button onClick={()=>handleDeleteReview( r.userId, r.reviews.indexOf(s))}>DELETE REVIEW</button>
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
  
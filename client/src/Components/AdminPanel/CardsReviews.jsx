import {React,  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../Redux/Actions/Actions";


export default function CardsReview({allUsers}) {

  const dispatch = useDispatch();
  const { Reviews } = useSelector((state) => state.reviews);
  
  useEffect(() => {
    dispatch(getReviews("All"));
  }, [dispatch]);


console.log(Reviews)


    return (
      <div>
        <p>reviews</p>
        {Reviews?.map((r)=>{
          return(
          r.reviews.length>0 ?
            <div>
              <p>reviews for {allUsers.find(u=> u.id===r.userId)?.name}</p>
              {r.reviews?.map((s) => {
      return(
        <div>
        <p>Comment:{s.comment}</p> 
        <p>score:{s.score}</p> 
  <p>Review By:{allUsers.find(u=> u.id===s.idReviewer).name}</p>
        </div>
        )  
  })}
            </div>
            : null
          )
          
        })
}
    {/* 
     */}
  </div>
    );
  }
  
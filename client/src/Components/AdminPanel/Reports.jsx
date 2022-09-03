import {React,  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import s from "../Home/Card/Card.module.css";
import { getReviews } from "../../Redux/Actions/Actions";


export default function Reports( { currentPost }, {allCountries}) {
  const { allUsers } = useSelector((state) => state.users);
  const user = allUsers

  const dispatch = useDispatch();
  const { Reviews } = useSelector((state) => state.reviews);
  
  useEffect(() => {
    dispatch(getReviews("All"));
  }, [dispatch]);


  return (
    <div>
      <p>Reports</p>
      <div>
  <p>reviews reports</p>

</div>
    </div>
  );
}

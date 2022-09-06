import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPosts,Searching } from "../../../Redux/Actions/Actions";
import s from "./Navbar.module.css";

const Search = ({setCurrentPage}) => {

  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = (e) => {
    let sell = false;

    if (e.target.innerHTML === "Buyers" && input !== '') {
      console.log("Buyers", input);
      dispatch(searchPosts({ input, sell: true }));
      dispatch(Searching('search'))
    }
    if (e.target.innerHTML === "Sellers" && input !== '') {
      console.log("Sellers", input);
      dispatch(searchPosts({ input, sell }));
      dispatch(Searching('search'))
    }
    setCurrentPage(1)
  };

  return (
    <div className={s.container_search}>
      <input onChange={handleChange} type="text" value={input} className={s.search} />
      <button onClick={handleClick} className={s.btn} >Buyers</button>
      <button onClick={handleClick} className={s.btn}>Sellers</button>
    </div>
  );
};

export default Search;

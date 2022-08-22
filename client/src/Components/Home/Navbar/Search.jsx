import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPosts } from "../../../Redux/Actions/Actions";

const Search = () => {

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
    }
    if (e.target.innerHTML === "Sellers" && input !== '') {
      console.log("Sellers", input);
      dispatch(searchPosts({ input, sell }));
    }
  };

  return (
    <div>
      <input onChange={handleChange} type="text" value={input} />
      <button onClick={handleClick}>Buyers</button>
      <button onClick={handleClick}>Sellers</button>
    </div>
  );
};

export default Search;

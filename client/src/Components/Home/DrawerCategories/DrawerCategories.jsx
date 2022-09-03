import React from "react";
import { filterBySubcategory,Searching } from "../../../Redux/Actions/Actions";
import { useDispatch } from "react-redux";
import s from "./DrawerCategories.module.css";
import { useState } from "react";

const Drawer = ({ allCategories, setCurrentPage }) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(filterBySubcategory(e.target.innerHTML));
    setCurrentPage(1);
    setActive(!active);
    dispatch(Searching('categories'))
  };

  return (
    <div className={s.container} >
      {allCategories?.map((e, i) => (
        <div key={i} className={s.container_subcategories}>
          <label>{e.name}</label>
          {e.subcategories.map((e, i) => (
            <li key={i} onClick={handleClick} className={s.container_li}>
              {e}
            </li>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Drawer;

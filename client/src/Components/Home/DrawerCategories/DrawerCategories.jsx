import React from "react";
import style from "./DrawerCategories.module.css";
import {  useDispatch } from "react-redux";
import { filterBySubcategory } from "../../../Redux/Actions/Actions";

const Drawer = ({allCategories}) => {

  const dispatch = useDispatch()
  const handleChange = (e) =>{
    dispatch(filterBySubcategory(e.target.value))
  }

  return (
    <div className={style.container}>
      <div className={style.containercard}>
        <div className={style.categories}>
          <h4 className={style.text}>CATEGORIES</h4>
          {allCategories?.map((e,i) => (
            <select key={i}  defaultValue={"DEFAULT"} onChange={handleChange} >
              <option value="DEFAULT" disabled>{e.name}</option>
              {
                e.subcategories?.map((e,i)=>(
                  <option key={i} value={e}>{e}</option>
                ))
              }
            </select>
          ))}
        </div>
      </div>
    </div>
  );
}

// Agriculture: Coffe, Corn, Rice, Soybeans, Sugar
// Energy: Gasoline, Heating Fuel, Natural Gas, Petroleum
// Livestock: Beef Cattle, Chicken Cattle, Pig Cattle
// Metals: Copper, Gold, Platinum, Silver 

export default Drawer

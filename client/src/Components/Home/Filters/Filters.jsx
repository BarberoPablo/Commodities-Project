import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Filter.module.css";
import {
  getAllCountries,
  filterByPayment,
  filterCountry,
  filterShippment,
} from "../../.././Redux/Actions/Actions";
import Select from "react-select";

const shipping = ["CIF", "FOB"];
const payment = ["DLC", "LC", "SBLC"];

const Filters = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  const { allCountries } = useSelector((state) => state.countries);
  const { posts } = useSelector((state) => state.posts);

  const countrysWithPost = posts.map((e) => e.country).sort();
  const countrysSet = new Set(countrysWithPost);
  const countrysToMap = [];

  // COUNTRIES
  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  countrysSet.forEach((e) => {
    let point = "";
    if (e === "") {
      countrysSet.delete(point);
    }
  });

  countrysSet.forEach((e) => {
    countrysToMap.push(e);
  });

  const allCountriesNames = allCountries.map((e) => e.name.common);
  allCountriesNames.sort();

  //FILTERS
  const sortPayment = (e) => {
    dispatch(filterByPayment(e.value));
    setCurrentPage(1);
  };

  const sortShippment = (e) => {
    console.log(e);
    dispatch(filterShippment(e.value));
    setCurrentPage(1);
  };

  const sortCountry = (e) => {
    dispatch(filterCountry(e.value));
    setCurrentPage(1);
  };

  return (
    <div className={style.container}>
      <div>
        <Select
          className={style.select}
          defaultValue={{ label: "SHIPPING" }}
          onChange={sortShippment}
          options={shipping.map((e) => ({ label: e, value: e }))}
          isSearchable={false}
        />
      </div>
      <div>
        <Select
          className={style.select}
          defaultValue={{ label: "PAYMENT" }}
          onChange={sortPayment}
          options={payment.map((e) => ({ label: e, value: e }))}
          isSearchable={false}
        />
      </div>
      <div>
        <Select
          className={style.select}
          defaultValue={{ label: "COUNTRY" }}
          onChange={sortCountry}
          options={countrysToMap.map((e) => ({ label: e, value: e }))}
        />
      </div>
    </div>
  );
};

export default Filters;

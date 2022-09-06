import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Filter.module.css";
import {
  filterByPayment,
  filterCountry,
  filterShippment,
  sortCountriesName
} from "../../.././Redux/Actions/Actions";
import Select from "react-select";
import Container from "react-bootstrap/esm/Container";


const shipping = ["CIF", "FOB"];
const payment = ["DLC", "LC", "SBLC"];

const Filters = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  const { countriesSorted } = useSelector((state) => state.countries);
  const { allPosts } = useSelector((state) => state.posts);

  // COUNTRIES
  useEffect(() => {
    dispatch(sortCountriesName(allPosts));
  }, [dispatch, allPosts]);


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
    <Container className={s.container} >
        <Select
          className={s.container_select}
          defaultValue={{ label: "SHIPPING" }}
          onChange={sortShippment}
          options={shipping.map((e) => ({ label: e, value: e }))}
          isSearchable={false}
        />
        <Select
          className={s.container_select}
          defaultValue={{ label: "PAYMENT" }}
          onChange={sortPayment}
          options={payment.map((e) => ({ label: e, value: e }))}
          isSearchable={false}
        />
        <Select
          className={s.container_select}
          defaultValue={{ label: "COUNTRY" }}
          onChange={sortCountry}
          options={countriesSorted.map((e) => ({ label: e, value: e }))}
        />
    </Container> 
  );
};

export default Filters;

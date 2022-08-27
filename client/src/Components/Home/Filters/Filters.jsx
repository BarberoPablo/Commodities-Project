import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from "./Filter.module.css"
import { getAllCountries, filterByPayment, filterCountry, filterShippment } from "../../.././Redux/Actions/Actions";
const Filters = ({ setCurrentPage }) => {

    const dispatch = useDispatch()
    const { allCountries } = useSelector(state => state.countries);

    const { posts } = useSelector(state => state.posts)

    const countrysWithPost = posts.map(e => e.country).sort()
    const countrysSet = new Set(countrysWithPost)
    const countrysToMap = []

    countrysSet.forEach(e => {
        let point = ""
        if (e === "") {
            countrysSet.delete(point)
        }
    }
    );
    countrysSet.forEach( e => {
        countrysToMap.push(e)
    });
 

    useEffect(() => {
        dispatch(getAllCountries());
    }, [dispatch]);

    const allCountriesNames = allCountries.map(e => e.name.common)
    allCountriesNames.sort()

    const sortPayment = (e) => {
        console.log(e.target.value)
        dispatch(filterByPayment(e.target.value))
        setCurrentPage(1)
    }

    const sortCountry = (e) => {
        dispatch(filterCountry(e.target.value))
        console.log(e.target.value)
        setCurrentPage(1)
    }

    const sortShippment = (e) => {
        dispatch(filterShippment(e.target.value))
        setCurrentPage(1)
    }

    return (
        <div className={style.container}>
            <div className={style.containercard}>
                <div className={style.categories}>
                    <h4 className={style.text}>Search your products by</h4>
                    <div>
                        <select className={style.select} defaultValue={"DEFAULT"} onChange={e => sortShippment(e)}>
                            <option value="DEFAULT" disabled>Shipping Terms</option>
                            <option value="ALL">ALL</option>
                            <option value="CIF">CIF</option>
                            <option value="FOB">FOB</option>
                        </select>
                    </div>
                    <div>
                        <select className={style.select} defaultValue={"DEFAULT"} onChange={e => sortPayment(e)}>
                            <option value="DEFAULT" disabled>Payment Terms</option>
                            <option value="ALL">ALL</option>
                            <option id="DLC" value="DLC">DLC</option>
                            <option id="LC" value="LC">LC</option>
                            <option id="SBLC" value="SBLC">SBLC</option>
                        </select>
                    </div>
                    <div>
                        <select className={style.select} defaultValue={"DEFAULT"} onChange={e => sortCountry(e)}>
                            <option value="DEFAULT" disabled>Country</option>
                            {countrysToMap.map((e, i) => (
                                <option key={i} value={e}>{e}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Filters

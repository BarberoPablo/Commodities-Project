import React from 'react'
import style from "./Filter.module.css"

const Filters = () => {
    return (
        <div className={style.container}>
            <div className={style.containercard}>
                <div className={style.categories}>
                    <div >
                        <select className={style.select} defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Shipping Terms</option>
                            <option>CIF</option>
                            <option>FOB</option>
                        </select>
                    </div>
                    <div>
                        <select className={style.select} defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Payment Terms</option>
                            <option>DLC</option>
                            <option>LC</option>
                            <option>SBLC</option>
                        </select>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Filters

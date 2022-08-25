import React, { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import style from "./Maps.module.css"

const BahiaBlanca = () => {

    const center = useMemo(() => ({ lat: -38.71878671928893, lng: -62.266768364493466 }), [])
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBhcv8b92XebDQA0rOSqbZQrA5GI659lfI"
    });

    if (!isLoaded) return <p>Loading...</p>


    return (
        <GoogleMap zoom={17} center={center} mapContainerClassName={style.mapcontainer} mapTypeId="satellite">
            <Marker position={{ lat: -38.71878671928893, lng: -62.266768364493466 }} />
        </GoogleMap>
    )
}

export default BahiaBlanca
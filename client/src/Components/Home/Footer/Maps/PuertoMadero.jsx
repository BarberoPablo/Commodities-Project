import React, { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import style from "./Maps.module.css"

const PuertoMadero = () => {
    const center = useMemo(() => ({ lat: -34.60548276848841, lng: -58.36220788165187 }), [])
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBhcv8b92XebDQA0rOSqbZQrA5GI659lfI"
    });

    if (!isLoaded) return <p>Loading...</p>


    return (
        <GoogleMap zoom={17} center={center} mapContainerClassName={style.mapcontainer} mapTypeId="satellite">
            <Marker position={{ lat: -27.36750297749476, lng: -55.8938362446043 }} />
            <Marker position={{ lat: -38.71878671928893, lng: -62.266768364493466 }} />
            <Marker position={{ lat: -34.60548276848841, lng: -58.36220788165187 }} />
        </GoogleMap>
    )
}

export default PuertoMadero

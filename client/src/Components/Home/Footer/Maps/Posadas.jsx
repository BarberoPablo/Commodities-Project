import React, { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import style from "./Maps.module.css"

const Posadas = () => {
    const center = useMemo(() => ({ lat: -27.36750297749476, lng: -55.8938362446043 }), [])
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBhcv8b92XebDQA0rOSqbZQrA5GI659lfI"
    });

    if (!isLoaded) return <p>Loading...</p>


    return (
        <GoogleMap zoom={17} center={center} mapContainerClassName={style.mapcontainer} mapTypeId="satellite">
            <Marker position={{ lat: -27.36750297749476, lng: -55.8938362446043 }} />
        </GoogleMap>
    )
}

export default Posadas

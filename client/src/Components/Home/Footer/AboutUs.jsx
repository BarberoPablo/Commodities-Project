import React from 'react'
import { NavLink } from 'react-router-dom'
import s from "./css/About.module.css";
import image from "../../../Img/LogoB2B.png";
const AboutUs = () => {
    return (
      <div className={s.container}>
      <h1>OUR MISSION</h1>
      <h3 style={{textTransform: 'uppercase'}}>Help you find trustworthy business partners. Worldwide.</h3>
      <p style={{fontWeight: '500'}}>
        Grow your business internationally, we take care of facilitating
        contacts around the world. By combining commodity buy and sell posts, we
        provide you a platform to communicate with top-tier brokers and
        sellers/buyers. Have all the contacts you need on a single platform,
        work from comfort... with a single click connect to all international
        trade.
      </p>
      <img
        style={{ maxWidth: "400px", maxHeight: "400px" }}
        src={image}
        alt="logo"
      />
      <NavLink
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "10%",
          margin: "50px auto",
          color: "black",
          textDecoration: "none",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "10px",
        }}
        to="contact-us"
      >
        Contact Us
      </NavLink>
    </div>
    )
}

export default AboutUs

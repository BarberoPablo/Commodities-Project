import React from 'react'
import { NavLink } from 'react-router-dom'

const AboutUs = () => {
    return (
        <div>
            <h1>Our mission</h1>
            <h2>Help you find trustworthy business partners. Worldwide.</h2>
            <h5>Grow your business internationally, we take care of facilitating contacts around the world.
                By combining commodity buy and sell posts, we provide you a platform to communicate with top-tier brokers and sellers/buyers.
                Have all the contacts you need on a single platform, work from comfort... with a single click connect to all international trade.</h5>
                <NavLink to="contact-us">Contact Us</NavLink>
        </div>
    )
}

export default AboutUs

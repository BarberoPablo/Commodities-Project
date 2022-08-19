import React from 'react'
import { useHistory } from "react-router-dom";

const Footer = () => {
    const history = useHistory();

    const goFor = (e) => {
        history.push("/" + e.target.id)
    }

    return (
        <div>
            <p id="about-us" onClick={e => goFor(e)}>About Us</p>
            <p id="contact-us" onClick={e => goFor(e)}>Contact Us</p>
            <p id="terms-of-use" onClick={e => goFor(e)}>Terms of Use</p>
            <p id="privacy-policy" onClick={e => goFor(e)}>Pivacy Policy</p>
        </div>
    )
}

export default Footer

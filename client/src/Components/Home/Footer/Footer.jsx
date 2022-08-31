import React from "react";
import s from "./css/Footer.module.css";

const Footer = () => {
  return (
    <div className={s.footer}>
      <a href="/about-us">About Us</a>
      <a href="/contact-us">Contact Us</a>
      <a href="/feedback">Feedback</a>
      <a href="/terms-of-use">Terms of Use</a>
      <a href="/privacy-policy">Privacy Policy</a>
      <a href="/glosary">Glosary</a>
    </div>
  );
};

export default Footer;

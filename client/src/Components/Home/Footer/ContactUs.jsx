import React from "react";
import BahiaBlanca from "./Maps/BahiaBlanca";
import PuertoMadero from "./Maps/PuertoMadero";
import Posadas from "./Maps/Posadas";
import s from "./css/Contact.module.css";

const ContactUs = () => {
  return (
    <div className={s.container}>
      <h1>Have a question about our services? Need Help?</h1>
      <h5>
        Send us a quick email and we will be glad to help you. You can contact
        us at the following address:
      </h5>
      <div>
      <p>
        📧<a href="/feedback">commoditiesB2Bteam@hotmail.com</a>
      </p>
        <div className={s.adressMaps}>
          <div className={s.adress}>
            <address>
              <span>Av. Colón 22</span> <br />
              <span>Bahia Blanca,</span> <br />
              <span>Buenos Aires</span>, <br />
              <span>8000 -</span> <span> ARG</span>. <br />
              Phone: <span className={s.phone}>+54 9 2916 41-9871</span> <br />
            </address>
            <BahiaBlanca />
            <address>
              <span>Felix de Azara 1872</span> <br />
              <span>Posadas,</span> <br />
              <span>Misiones</span>, <br />
              <span>3300 -</span> <span> ARG</span>. <br />
              Phone: <span className={s.phone}>+54 9 3764 41-0695</span> <br />

            </address>
            <Posadas />
            <address>
              <span>Macacha Güemes 515</span> <br />
              <span>Puerto Madero,</span> <br />
              <span>Ciudad Autónoma de Buenos Aires</span>, <br />
              <span>1000-1499 -</span> <span> ARG</span>. <br />
              Phone: <span className={s.phone} >+54 9 11 3941-2309</span> <br />
            </address>  
            <PuertoMadero />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

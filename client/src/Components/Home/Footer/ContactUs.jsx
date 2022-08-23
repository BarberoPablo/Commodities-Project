import React from 'react'

const ContactUs = () => {
  return (
    <div>
      <h1>Have a question about our services? Need Help?</h1>
      {/*<a href="/feedback">📧Click here to email us.</a>*/}
      <h5>Send us a quick email and we will be glad to help you. You can contact us at the following address:</h5>
      <p>📧<span>b2bcommodities@hotmail.com</span></p>
      <div>
        <b>Argentina:</b><br /><br />
        <address>
          <span>Villarino 433</span> <br />
          <span>Bahia Blanca,</span> <br />
          <span>Buenos Aires</span>, <br />
          <span>8000 -</span> <span> ARG</span>. <br />
          Phone: <span>+54 9 2916 41-9871</span> <br />
        </address>
        <br />
        <address>
          <span>Ayacucho 2030</span> <br />
          <span>Posadas,</span> <br />
          <span>Misiones</span>, <br />
          <span>3300 -</span> <span> ARG</span>. <br />
          Phone: <span>+54 9 3764 41-0695</span> <br />
        </address>
        <br />
        <address>
          <span>Macacha Güemes 515</span> <br />
          <span>Puerto Madero,</span> <br />
          <span>Ciudad Autónoma de Buenos Aires</span>, <br />
          <span>1000-1499 -</span> <span> ARG</span>. <br />
          Phone: <span>+54 9 11 3941-2309</span> <br />
        </address>
      </div>
    </div>
  )
}

export default ContactUs

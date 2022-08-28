import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

/* Estructura de un plan:
    name: STRING,
    cost: INTEGER,
    contacts: INTEGER,
    posts: BOOLEAN
    reviews: BOOLEAN,
*/
const Plan = ({ name, cost, contacts, posts, reviews, bought }) => {
  // Crea una orden de PayPal
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: cost,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
      bought(name);
    });
  };
  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  return (
    <div
      onClick={() => {
        if (cost) {
          setShow(!show);
        }
      }}
    >
      <PayPalScriptProvider
        options={{
          "client-id": "AQmAOKkaooq3WRmt-zUyck2qmSVYykzLUOhUfHPFDEFfDGY92Pn_ExDZCdG2zmreMqCBN3tGJta5vEBT",
        }}
      >
        <div>
          <div className="wrapper">
            <div className="product-info">
              <div className="product-text">
                {/*Plan name*/}
                <h1>{name.toUpperCase()} Membership </h1>

                {/*Plan cost*/}
                <h2>Price: ${cost} USD</h2>

                {/*Plan description*/}
                <p>
                  {contacts ? `✔ Contacts: ${contacts}` : "❌ Contacts"}
                  <br />
                  {posts ? "✔" : "❌"}
                  Posts
                  <br />
                  {reviews ? "✔" : "❌"}
                  Reviews
                  <br />
                </p>
              </div>
            </div>
          </div>

          {show ? (
            <PayPalButtons
              style={{ shape: "pill", color: "white", layout: "horizontal", label: "subscribe" }}
              createOrder={createOrder}
              onApprove={onApprove}
            />
          ) : null}
        </div>
      </PayPalScriptProvider>
    </div>
  );
};
export default Plan;

import React, { useState } from "react";
import {useSelector} from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function App() {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const { plans } = useSelector((state) => state.plans);

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: 20,
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
    });
  };
  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };
  return (
    <PayPalScriptProvider
      options={{
        "client-id": "AQmAOKkaooq3WRmt-zUyck2qmSVYykzLUOhUfHPFDEFfDGY92Pn_ExDZCdG2zmreMqCBN3tGJta5vEBT",
      }}
    >
      <div>
        <div className="wrapper">
          <div className="product-img">
            <img
              src="https://cdn.pixabay.com/photo/2021/08/15/06/54/sunflower-6546993_1280.jpg"
              alt="SunFlower"
              height="420"
              width="327"
            />
          </div>
          <div className="product-info">
            <div className="product-text">
              <h1>Sunflower</h1>
              <h2>POPULAR HOUSE PLANT</h2>
              <p>
                Sunflowers are usually tall annual or perennial plants.
                <br />
                Each "flower" is actually a
                <br />
                disc made up of tiny flowers,
                <br />
                to better attract pollinators.{" "}
              </p>
            </div>

            <div className="product-price-btn">
              <p>
                <span>$20</span>
              </p>
              <button type="submit" onClick={() => setShow(true)}>
                Buy now
              </button>
            </div>
          </div>
        </div>

        {show ? <PayPalButtons style={{ layout: "vertical" }} createOrder={createOrder} onApprove={onApprove} /> : null}
      </div>
    </PayPalScriptProvider>
  );
}

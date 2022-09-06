/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import s from "./membership.module.css";
import {
  BsCheck2Circle,
  BsFillPersonCheckFill,
  BsFillStarFill,
  BsXCircle
} from "react-icons/bs";

/* Estructura de un plan:
    name: STRING,
    cost: INTEGER,
    contacts: INTEGER,
    posts: BOOLEAN
    reviews: BOOLEAN,
*/
const Plan = ({
  name,
  cost,
  contacts,
  posts,
  reviews,
  bought,
  setPaymentConfirmed,
}) => {
  // Crea una orden de PayPal
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Membership",
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
      setPaymentConfirmed("approved");
    });
  };
  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
    setPaymentConfirmed("rejected");
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
          "client-id":
            "AQmAOKkaooq3WRmt-zUyck2qmSVYykzLUOhUfHPFDEFfDGY92Pn_ExDZCdG2zmreMqCBN3tGJta5vEBT",
        }}
      >
        <div>
          <div>
            <div className={s.card}>
              <div className={s.product}>
                <div className={s.infoPlan}>
                  {/*Plan name*/}

                  <h2>{name.toUpperCase()}</h2>
                  {/*Plan cost*/}
                  <h3>${cost} USD</h3>
                  <hr />
                </div>

                {/*Plan description*/}
                {contacts ? (
                  <>
                    {name === "Premium" ? <p>Unlimited contacts</p> : <p>Contacts {contacts}</p>}
                    <BsFillPersonCheckFill /> 
                    
                  </>
                ) : (
                  <>
                    <p>Contacts</p>
                    <BsXCircle />
                  </>
                )}

                {posts ? (
                  <>
                    <p>Posts</p>
                    <BsCheck2Circle />
                  </>
                ) : (
                  <>
                    <p>Posts</p>
                    <BsXCircle />
                  </>
                )}

                {reviews ? (
                  <>
                    <p>Reviews</p>
                    <BsFillStarFill />
                  </>
                ) : (
                  <>
                    <p>Reviews</p>
                    <BsXCircle />
                    
                  </>
                )}
              </div>
              <br/>
              {show ? (
            <PayPalButtons
              style={{
                tagline: "false",
                shape: "rect",
                color: "white",
                layout: "horizontal",
                label: "subscribe",
              }}
              createOrder={createOrder}
              onApprove={onApprove}
            />
          ) : null}
          </div>
            </div>
            

          
        </div>
      </PayPalScriptProvider>
    </div>
  );
};
export default Plan;

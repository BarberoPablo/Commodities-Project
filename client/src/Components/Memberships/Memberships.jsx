import React, { useEffect, useState } from "react";
import Plan from "./Plan";
import { useDispatch, useSelector } from "react-redux";
import { getPlans, getUserDetails, getUser, asignPlanToUser } from "../../Redux/Actions/Actions";
import { useAuth0 } from "@auth0/auth0-react";

const Memberships = () => {
  const { memberships } = useSelector((state) => state.plans);
  const userLog = useSelector((state) => state.users.user);
  const { user } = useAuth0();
  const [planBought, setPlanBought] = useState("");
  const [paymentConfirmed, setPaymentConfirmed] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlans());
    dispatch(getUser());
    // Tal vez no sea necesario preguntar por el user:
    if (user) {
      dispatch(getUserDetails(user.email));
    }
    if (planBought) {
      dispatch(
        asignPlanToUser({
          planName: planBought,
          email: user.email,
        })
      );
    }
    //Sacar user:
  }, [dispatch, user, planBought]);

  /* Estructura de un plan:
  name: STRING,
  cost: INTEGER,
  contacts: INTEGER,
  posts: BOOLEAN
  reviews: BOOLEAN,
  */
  return (
    <div>
      <div>
        <h1>
          Remaining contacts:{" "}
          {userLog?.remainingContacts +
          (memberships ? memberships[memberships.findIndex((plan) => plan.name === planBought)]?.contacts : 0)
            ? userLog?.remainingContacts +
              (memberships ? memberships[memberships.findIndex((plan) => plan.name === planBought)]?.contacts : 0)
            : userLog?.remainingContacts}
        </h1>
        {paymentConfirmed ? (
          paymentConfirmed === "approved" ? (
            <h1 color="green">Payment {paymentConfirmed}</h1>
          ) : (
            <h1 color="red">Payment {paymentConfirmed}</h1>
          )
        ) : null}
      </div>
      {memberships?.map((plan, index) => {
        return (
          <Plan
            key={index}
            name={plan.name}
            cost={plan.cost}
            contacts={plan.contacts}
            posts={plan.posts}
            reviews={plan.reviews}
            bought={setPlanBought}
            setPaymentConfirmed={setPaymentConfirmed}
          />
        );
      })}
    </div>
  );
};

export default Memberships;

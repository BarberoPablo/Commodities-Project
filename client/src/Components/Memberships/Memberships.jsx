import React, { useEffect, useState } from "react";
import Plan from "./Plan";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlans,
  getUserDetails,
  getUser,
  asignPlanToUser,
  mailTous,
} from "../../Redux/Actions/Actions";
import { useAuth0 } from "@auth0/auth0-react";
import s from "./membership.module.css";

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
      // dispatch(
      //   mailTous({
      //     from: "commoditiesB2Bteam@hotmail.com",
      //     to: user.email,
      //     subject: "Thank you for choosing the " + user.plan + "b2b Membership!",
      //     text: `You just bought the ${user.plan} membership!.
      //     Now you can contact other users from all over the world to do business.
      //     We, the team of B2B Commodities are here to make your business grow. Thank you for choosing us.
      //     Feel free to contact us at commoditiesB2Bteam@hotmail.com`
      // })
      // );
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
      {userLog && userLog.country ? (
        <div>
          <h1 className={s.h1}>
            Remaining contacts:{" "}
            {planBought === "Premium" || userLog?.planId === 3
              ? "Unlimited"
              : userLog?.remainingContacts +
                (memberships
                  ? memberships[
                      memberships.findIndex((plan) => plan.name === planBought)
                    ]?.contacts
                  : 0)
              ? userLog?.remainingContacts +
                (memberships
                  ? memberships[
                      memberships.findIndex((plan) => plan.name === planBought)
                    ]?.contacts
                  : 0)
              : userLog?.remainingContacts}
          </h1>
          <div className={s.containerCard}>
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
          <div className={s.approved}>
            {paymentConfirmed ? (
              paymentConfirmed === "approved" ? (
                <h1 color="green">Payment {paymentConfirmed}</h1>
              ) : (
                <h1 color="red">Payment {paymentConfirmed}</h1>
              )
            ) : null}
          </div>
        </div>
      ) : (
        <h1>Please log in and set your country and phone number</h1>
      )}
    </div>
  );
};

export default Memberships;

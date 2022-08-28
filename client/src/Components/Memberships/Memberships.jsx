import React, { useEffect, useState } from "react";
import Plan from "./Plan";
import { useDispatch, useSelector } from "react-redux";
import { getPlans, getUserDetails, getUser, asignPlanToUser } from "../../Redux/Actions/Actions";
import { useAuth0 } from "@auth0/auth0-react";

const Memberships = () => {
  const { memberships } = useSelector((state) => state.plans);
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const [planBought, setPlanBought] = useState("");

  useEffect(() => {
    dispatch(getPlans());
    dispatch(getUser());
    // Tal vez no sea necesario preguntar por el user:
    if (user) {
      dispatch(getUserDetails(user.email));
    }
    if (planBought) {
      //http://localhost:3001/planUser
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
      {memberships?.map((plan, index) => {
        return (
          <Plan
            key={index}
            name={plan.name}
            //cost={plan.cost}
            cost={1}
            contacts={plan.contacts}
            posts={plan.posts}
            reviews={plan.reviews}
            bought={setPlanBought}
          />
        );
      })}
    </div>
  );
};

export default Memberships;

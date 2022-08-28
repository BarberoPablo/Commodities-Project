import React, { useEffect } from "react";
import Plan from "./Plan";
import { useDispatch, useSelector } from "react-redux";
import { getPlans } from "../../Redux/Actions/Actions";
import { getUserDetails } from "../../Redux/Actions/Actions";
import { useAuth0 } from "@auth0/auth0-react";

const Memberships = () => {
  const { memberships } = useSelector((state) => state.plans);
  const dispatch = useDispatch();
  const { user } = useAuth0();

  useEffect(() => {
    dispatch(getPlans());
    // Tal vez no sea necesario preguntar por el user:
    if (user) {
      dispatch(getUserDetails(user.email));
    }
    console.log("1:", user);
    //Sacar user:
  }, [dispatch, user]);
  /* Estructura de un plan:
  name: STRING,
  cost: INTEGER,
  contacts: INTEGER,
  posts: BOOLEAN
  reviews: BOOLEAN,
  */
  return (
    <div>
      {console.log("1:", user)}
      {console.log(memberships)}
      {memberships?.map((plan, index) => {
        return (
          <Plan
            key={index}
            name={plan.name}
            cost={plan.cost}
            contacts={plan.contacts}
            posts={plan.posts}
            reviews={plan.reviews}
          />
        );
      })}
    </div>
  );
};

export default Memberships;

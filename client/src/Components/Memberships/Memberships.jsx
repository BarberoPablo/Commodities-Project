import React, { useEffect } from "react";
import Plan from "./Plan";
import { useDispatch, useSelector } from "react-redux";
import { getPlans } from "../../Redux/Actions/Actions";

const Memberships = () => {
  const { memberships } = useSelector((state) => state.plans);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlans());
  }, [dispatch]);
  /* Estructura de un plan:
    name: STRING,
    cost: INTEGER,
    contacts: INTEGER,
    posts: BOOLEAN
    reviews: BOOLEAN,
*/
  return (
    <div>
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

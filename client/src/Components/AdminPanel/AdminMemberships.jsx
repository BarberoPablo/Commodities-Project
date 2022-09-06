import React, { useState, useEffect } from "react";
import {
  getPlans,
  createNewPlan,
  updateMembership,
} from "../../Redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";

export default function AdminMemberships() {
  const dispatch = useDispatch();
  const { memberships } = useSelector((state) => state.plans);
  const [modifyPlan, setModifyPlan] = useState({});

  useEffect(() => {
    dispatch(getPlans());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    cost: "",
    contacts: "",
    posts: "",
    reviews: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeModify(e, planName) {
    setModifyPlan({
      ...modifyPlan,
      [planName]: { ...modifyPlan[planName], [e.target.name]: e.target.value },
    });
  }

  // Se usa para crear un plan, no para modificarlo
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createNewPlan(input));
  }

  function handleModify(e, planName) {
    e.preventDefault();
    dispatch(updateMembership(modifyPlan, planName));
  }

  return (
    <div>
      <p>Edit plans:</p>
      {memberships?.map((plan, index) => {
        return (
          <div key={index}>
            <form onSubmit={(e) => handleModify(e, plan.name)}>
              <label>name:</label>
              <input
                name="name"
                type="text"
                placeholder={plan.name}
                onChange={(e) => handleChangeModify(e, plan.name)}
              />
              <label>cost:</label>
              <input
                name="cost"
                type="number"
                placeholder={plan.cost}
                onChange={(e) => handleChangeModify(e, plan.name)}
              />
              <label>contacts:</label>
              <input
                name="contacts"
                type="number"
                placeholder={plan.contacts}
                onChange={(e) => handleChangeModify(e, plan.name)}
              />
              <label>posts:</label>
              <select
                name="posts"
                onChange={(e) => handleChangeModify(e, plan.name)}
              >
                <option hidden>{plan.posts ? "true" : "false"}</option>
                <option value={true}>TRUE</option>
                <option value={false}>FALSE</option>
              </select>
              <label>reviews:</label>
              <select
                name="reviews"
                onChange={(e) => handleChangeModify(e, plan.name)}
              >
                <option hidden>{plan.reviews ? "true" : "false"}</option>
                <option value={true}>TRUE</option>
                <option value={false}>FALSE</option>
              </select>
              <button type="submit">UPDATE</button>
            </form>
          </div>
        );
      })}

      <p>Create new plan:</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>name:</label>
        <input
          type="text"
          placeholder="plan name"
          onChange={(e) => handleChange(e)}
          name="name"
          value={input.name}
        />
        <label>cost:</label>
        <input
          type="number"
          placeholder="plan cost"
          onChange={(e) => handleChange(e)}
          name="cost"
          value={input.cost}
        />
        <label>contacts:</label>
        <input
          type="number"
          placeholder="plan contacts"
          onChange={(e) => handleChange(e)}
          name="contacts"
          value={input.contacts}
        />
        <label>posts:</label>
        <select
          onChange={(e) => handleChange(e)}
          name="posts"
          value={input.posts}
        >
          <option hidden>posts</option>
          <option value={true}>TRUE</option>
          <option value={false}>FALSE</option>
        </select>
        <label>reviews:</label>
        <select
          onChange={(e) => handleChange(e)}
          name="reviews"
          value={input.reviews}
        >
          <option hidden>reviews</option>
          <option value={true}>TRUE</option>
          <option value={false}>FALSE</option>
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

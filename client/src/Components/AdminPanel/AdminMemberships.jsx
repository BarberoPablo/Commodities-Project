import React, { useState, useEffect } from "react";
import { getPlans, createNewPlan } from "../../Redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";


export default function AdminMemberships() {
  const dispatch = useDispatch();
  const { memberships } = useSelector((state) => state.plans);


  useEffect(() => {
    dispatch(getPlans());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    cost: "",
    contacts: "",
    posts: "",
    reviews: "",
  })

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e){
    e.preventDefault();
    dispatch(createNewPlan(input));
  }

    return (
      <div>
    <p>Edit plans:</p>
    {memberships?.map((plan) => {



      return (
        <div>
          <form>
        <label>name:</label>
        <input type="text" placeholder={plan.name} 
        // onChange={(e) => handleChange(e)} name="name" value={input.name}
        />
        <label>cost:</label>
        <input type="number" placeholder={plan.cost} 
        //onChange={(e) => handleChange(e)} name="cost" value={input.cost}
        />
        <label>contacts:</label>
        <input type="number" placeholder={plan.contacts} 
        //onChange={(e) => handleChange(e)} name="contacts" value={input.contacts}
        />
        <label>posts:</label>
        <select 
        //onChange={(e) => handleChange(e)} name="posts" value={input.posts}
        >
          <option hidden>{plan.posts?"true":"false"}</option>
          <option value={true}>TRUE</option>
          <option value={false}>FALSE</option>
        </select>
        <label>reviews:</label>
        <select 
        //</form>onChange={(e) => handleChange(e)} name="reviews" value={input.reviews}
        >
          <option hidden>{plan.reviews?"true":"false"}</option>
          <option value={true}>TRUE</option>
          <option value={false}>FALSE</option>
        </select>
        <button>UPDATE</button>
          </form>
</div>
        );
      })}

      <p>Create new plan:</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>name:</label>
        <input type="text" placeholder="plan name" onChange={(e) => handleChange(e)} name="name" value={input.name}/>
        <label>cost:</label>
        <input type="number" placeholder="plan cost" 
        onChange={(e) => handleChange(e)} name="cost" value={input.cost} />
        <label>contacts:</label>
        <input type="number" placeholder="plan contacts" 
        onChange={(e) => handleChange(e)} name="contacts" value={input.contacts}
        />
        <label>posts:</label>
        <select 
        onChange={(e) => handleChange(e)} name="posts" value={input.posts}
        >
          <option hidden>posts</option>
          <option value={true}>TRUE</option>
          <option value={false}>FALSE</option>
        </select>
        <label>reviews:</label>
        <select onChange={(e) => handleChange(e)} name="reviews" value={input.reviews} >
          <option hidden>reviews</option>
          <option value={true}>TRUE</option>
          <option value={false}>FALSE</option>
        </select>
        <button type="submit">Create</button>
          </form>
      </div>
    );
  }

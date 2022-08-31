import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { mailTous } from "../../../Redux/Actions/Actions";
import s from "./css/Feed.module.css";
export function validate(input) {
  let errors = {};
  if (!input.subject) {
    errors.subject = "Please send us a subject for better organization.";
  } else if (!input.text) {
    errors.text = "Give us the details of why you write to us";
  }
  return errors;
}

const Feedback = () => {
  const [input, setInput] = useState({
    from: "commoditiesb2b@hotmail.com",
    to: "",
    subject: "",
    text: "",
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !errors.text &&
      !errors.to &&
      !errors.subject &&
      !errors.text &&
      !errors.length
    ) {
      alert("Email sent successfully.");
      input.to = "commoditiesb2b@hotmail.com" + "," + input.to;
      input.subject = "REPLY FROM B2B: " + input.subject;
      input.text =
        `Your message has already reached our team and we will respond as soon as possible. 
            ||This is the email you sent to us:    ` + input.text;
      dispatch(mailTous(input));
      setInput({
        ...input,
        to: "",
        subject: "",
        text: "",
      });
    } else {
      return alert("You have not filled in all the fields correctly");
    }
  };

  return (
    <div className={s.container}>
      <h1>We want your feedback!</h1>
      <h4>
        Have a Suggestion? Found a Bug? or Simply looking for Help? Drop us
        email.
      </h4>
      <br />
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => handleChange(e)}
          name="to"
          value={input.to}
          type="email"
          placeholder="Your email"
        ></input>
        {errors.to ? <p>{errors.to}</p> : false}
        <br />
        <br />

        <input
          onChange={(e) => handleChange(e)}
          name="subject"
          value={input.subject}
          placeholder="Subject of the email"
        ></input>
        {errors.subject ? <p>{errors.subject}</p> : false}
        <br />
        <br />
        <input
          onChange={(e) => handleChange(e)}
          name="text"
          value={input.text}
          placeholder="What do you need from us?"
        ></input>
        {errors.text ? <p>{errors.text}</p> : false}
        <br />
        <br />
        <button className={s.boton} type="submit">
          Send us!
        </button>
      </form>
    </div>
  );
};

export default Feedback;

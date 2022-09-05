import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailTous, reportTo, getUser } from "../../../Redux/Actions/Actions";

function validate(input) {
  let errors = {};
  if (!input.subject) {
    errors.subject = "Please send us a reason for better organization.";
  } else if (!input.text) {
    errors.text = "Give us the details of why you write this report";
  }
  return errors;
}
const Report = ({ match }) => {
  const [errors, setErrors] = useState({});
  const { idReview } = match.params;
  const { postId } = match.params;
  const dispatch = useDispatch();
  const { allUsers } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  const userFilter = allUsers.filter(e => e.id === Number(idReview));

  const [input, setInput] = useState({
    from: "commoditiesb2b@hotmail.com",
    to: userFilter[0]?.email,
    subject: "",
    text: "",
  });


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
      !errors.subject &&
      !errors.text &&
      !errors.length
    ) {
      alert("Email sent successfully.");
      input.to = "commoditiesb2b@hotmail.com, " + userFilter[0]?.email;
      input.subject = "REPLY FROM B2B REPORT: " + input.subject;
      input.text =
        `Your report has already reached to our team and we will respond as soon as possible. 
              ||This is the explain you sent to us:    ` + input.text;
      dispatch(mailTous(input));
      dispatch(reportTo(postId, idReview, "Report"))
      setInput({
        ...input,
        subject: "",
        text: "",
      });
    } else {
      return alert("You have not filled in all the fields correctly");
    }
  };
  return (
    <div>
      <h1>Report</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>From: {userFilter[0]?.email}</label>
        <br />
        <label htmlFor="toFalse">ID of post: {+ Number(postId)}</label>
        <br />
        <br />
        <label htmlFor="subject">Reason:</label>
        <input
          name="subject"
          value={input.subject}
          onChange={(e) => handleChange(e)}
        ></input>
        {errors.subject ? <p>{errors.subject}</p> : false}
        <br />
        <br />
        <label htmlFor="text">Explain:</label>
        <input
          name="text"
          value={input.text}
          onChange={(e) => handleChange(e)}
        ></input>
        {errors.text ? <p>{errors.text}</p> : false}
        <br />
        <br />
        <button type="submit">Send the report</button>
      </form>
    </div>
  );
};

export default Report;

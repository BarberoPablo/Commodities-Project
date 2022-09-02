import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { mailTous, reportTo } from "../../../Redux/Actions/Actions";

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
  const [input, setInput] = useState({
    from: "commoditiesb2b@hotmail.com",
    to: "",
    subject: "",
    text: "",
  });

  const [errors, setErrors] = useState({});
  const {idReview} = match.params;
  const {postId} = match.params;
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
        `Your report has already reached to our team and we will respond as soon as possible. 
              ||This is the email you sent to us:    ` + input.text;
      dispatch(mailTous(input));
      dispatch(reportTo(postId, idReview, "Report"))
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
    <div>
      <h1>Report</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="to">From:</label>
        <input
          name="to"
          value={input.to}
          onChange={(e) => handleChange(e)}
        ></input>
        <br />
        <br />
        <label htmlFor="toFalse">To:</label>
        <input htmlFor="toFalse"></input>
        <br />
        <br />
        <label htmlFor="subject">Reason:</label>
        <input
          name="subject"
          value={input.title}
          onChange={(e) => handleChange(e)}
        ></input>
        <br />
        <br />
        <label htmlFor="text">Explain:</label>
        <input
          name="text"
          value={input.text}
          onChange={(e) => handleChange(e)}
        ></input>
        <button type="submit">Send the report</button>
      </form>
    </div>
  );
};

export default Report;

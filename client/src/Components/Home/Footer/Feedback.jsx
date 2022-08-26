import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { mailTous } from '../../../Redux/Actions/Actions';

export function validate(input) {
    let errors = {};
    if (!/^([da-z_.-]+)@([da-z.-]+).([a-z.]{2,6})$/g.test(input.to)) {
      errors.to = 'Your email is required. Has to ve a valid email.';
    } 
    if (!input.subject) {
      errors.subject = 'Please send us a subject for better organization.';
    } else if (!input.text) {
        errors.text = "Give us the details of why you write to us"
    }
    return errors;
};  



const Feedback = () => {

    const [input, setInput] = useState({
        from: "b2bcommodities@hotmail.com",
        to: "",
        subject: "",
        text: "",
    });

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch()

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    
    }

    const handleSubmit = () => {
        if(!errors.text && !errors.to && !errors.subject && !errors.text && errors.length){
            alert("Email sent successfully.");
            dispatch(mailTous(input));
            setInput({
                ...input,
                to: "",
                subject: "",
                text: "",
            })
        } else {
            return alert("You have not filled in all the fields correctly")
        }
    }

    return (
        <div>
            <h1>We want your feedback!</h1>
            <h4>Have a Suggestion? Found a Bug? or Simply looking for Help? Drop us email.</h4>
            <br />
            <form onSubmit={(e) => handleSubmit(e)}>
                <input onChange={(e) => handleChange(e)} name="to" value={input.to} placeholder="Your email"></input>
                {errors.to ? <p>{errors.to}</p> : false}
                <br/>
                <br/>
                
                <input onChange={(e) => handleChange(e)} name="subject" value={input.subject} placeholder="Subject of the email"></input>
                {errors.subject ? <p>{errors.subject}</p> : false}
                <br/> 
                <br/> 
                <input onChange={(e) => handleChange(e)} name="text" value={input.text} placeholder="What do you need from us?"></input>
                {errors.text ? <p>{errors.text}</p> : false}
                <br/>
                <br/> 
                <button type="submit">Send us!</button>
            </form>
        </div>
    )
}

export default Feedback

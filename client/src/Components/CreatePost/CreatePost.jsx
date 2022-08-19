import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { postPost } from "../actions/index";  //importar acciones
//import { useDispatch, useSelector } from "react-redux";

export default function CreatePost() {
  //const dispatch = useDispatch();
  //const post = useSelector((state) => state.posts);   // importar state
  const [errors, setErrors] = useState({})    //validaciones front

const [input, setInput] = useState({ //acomadar a modelo
  id: "",
  user: "",
  tittle:"",
  post: "",
  Shippingmethods:"",
  Paymentmethod:"",
  buy: false,
  sell: false,
  Category: "",
  SubCategory: "",
  idUser:"",
});

//handles
function handleChange(e){
  setInput({
    ...input,
    [e.target.name]: e.target.value
  })}

function handleCheck(e){
  if(e.target.value === "sell"){
    setInput({
      ...input,
      sell:true
    })
  } else{
    setInput({
      ...input,
      buy:true
    })
  }
  }

function handleSubmit(e){
  e.preventDefault();
  let val = validacion(input);
  setErrors(val)
  if(Object.keys(val).length >0 ){
    alert("Fix errors");
    val = {}
    return
  }
  console.log(input)
  //dispatch(postPost(input))
  alert("Activity Created")
  setInput({
    id: "",
    user: "",
    tittle:"",
    post: "",
    buy: false,
    sell: false,
    Shippingmethods:"",
    Category: "",
    SubCategory: "",
    idUser:"",
  })
}

//validacion
function validacion(input){
    let errors = {};
    return errors
  }

  return (
<div>
  <Link to="/home">
    <button className="boton" id="btna">Go Back</button>
  </Link>
  <h1>Create new post</h1>
<form onSubmit={(e)=>handleSubmit(e)}>
  <label>Tittle: </label>
  <input type="text" value={input.tittle} autoComplete="off" placeholder="Please write a tittle..." name="tittle" onChange={(e)=>handleChange(e)}/><br/>
  
  <select value={input.Shippingmethods} name="Shippingmethods" onChange={(e)=>handleChange(e)}>
    <option hidden value="">Shipping method</option>
    <option value="CIF">CIF</option>
    <option value="FOB">FOB</option>
  </select>

  <select value={input.Paymentmethod} name="Paymentmethod" onChange={(e)=>handleChange(e)}>
    <option hidden value="">Payment method</option>
    <option value="LC">LC</option>
    <option value="DLC">DLC</option>
    <option value="SBLC">SBLC</option>
  </select><br/>

  <select value={input.Category} name="Category" onChange={(e)=>handleChange(e)}>
    <option hidden value="">Select category</option>
    <option value="">category1</option>
  </select><br/>

  <label>Post: </label>
  <textarea value={input.post} autoComplete="off" placeholder="Please write a descrition..." name="post" onChange={(e)=>handleChange(e)}/><br/>

  <label><input onChange={(e)=>handleCheck(e)}  type="radio" name="check" value="buy" />Buy</label>
  <label><input onChange={(e)=>handleCheck(e)}  type="radio" name="check" value="sell"/>sell</label><br/>

  <button type="submit" className="boton">Create Post</button>
</form>

</div>
  )}








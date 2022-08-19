import React, { useState } from "react";
import { Link } from "react-router-dom";
//import { postPost } from "../redux/Actions/Actions.js";  //importar acciones
//import { useDispatch, useSelector } from "react-redux";

export default function CreatePost() {
  //const dispatch = useDispatch();
  const [errors, setErrors] = useState({})    //validaciones front
  const [checkBS, setCheckBS] = useState(0) 

  //actions necesarias
  //get category y sub category

const [input, setInput] = useState({ //acomadar a modelo
  id: "",
  user: "",
  tittle:"",
  description: "",
  sell: false,
  shipping:"",
  payment:"",
  Category: "",
  SubCategory: "",
  idUser:"",
  image:"",
});

//handles
function handleChange(e){
  setInput({
    ...input,
    [e.target.name]: e.target.value
  })}

function handleCheck(e){
  setCheckBS(1)
  if(e.target.value === "sell"){
    setInput({
      ...input,
      sell:true
    })
  } 
  if(e.target.value === "buy"){
    setInput({
      ...input,
      sell:false
    })
  }
  }

function handleSubmit(e){
  e.preventDefault();
  let val = validacion(input);
  setErrors(val)
  //dispatch(postPost(input))
  if(Object.keys(val).length >0 ){
    alert("Fix errors");
    val = {}
    return
  }
  console.log(input)
  alert("Post Created")
  setInput({
    id: "",
    user: "",
    tittle:"",
    description: "",
    sell: false,
    shipping:"",
    payment:"",
    Category: "",
    SubCategory: "",
    idUser:"",
    image:"",
  })
}

//validacion
function validacion(input){
  let errors = {};
  if(!input.tittle){errors.tittle="Please complete the tittle of the post"}
  if(input.description === ""){errors.description = "Complete description";}
  if(input.description.length > 255){errors.description = "the description can not have more than 255 characters";}
  if(input.shipping === ""){errors.shipping = "Complete shipping";}
  if(input.payment === ""){errors.payment = "Complete payment";}
  if(input.Category === ""){errors.Category = "Complete Category";}
  //if(input.SubCategory === ""){errors.SubCategory = "Complete SubCategory";}
  if(checkBS<1){errors.sell = "Select sell or buy";}

  return errors
}

  return (
<div>
  <Link to="/">
    <button className="boton" id="btna">Go Back</button>
  </Link>
  <h1>Create new post</h1>
<form onSubmit={(e)=>handleSubmit(e)}>
  <label>Tittle: </label>
  <input type="text" value={input.tittle} autoComplete="off" placeholder="Please write a tittle..." name="tittle" onChange={(e)=>handleChange(e)}/><br/>
  {errors.tittle &&<p className="err">{errors.tittle}</p>}

  <select value={input.shipping} name="shipping" onChange={(e)=>handleChange(e)}>
    <option hidden value="">Shipping method</option>
    <option value="CIF">CIF</option>
    <option value="FOB">FOB</option>
    <option value="CIF or FOB">CIF or FOB</option>
  </select>
  {errors.shipping &&<p className="err">{errors.shipping}</p>}

  <select value={input.payment} name="payment" onChange={(e)=>handleChange(e)}>
    <option hidden value="">Payment method</option>
    <option value="LC">LC</option>
    <option value="DLC">DLC</option>
    <option value="SBLC">SBLC</option>
    <option value="Any">Any</option>
  </select><br/>
  {errors.payment &&<p className="err">{errors.payment}</p>}

  <select value={input.Category} name="Category" onChange={(e)=>handleChange(e)}>
    <option hidden value="">Select category</option>
    <option value="asd">get categoriy</option>
  </select><br/>
  {errors.Category &&<p className="err">{errors.Category}</p>}

  {/* <select value={input.Category} name="Category" onChange={(e)=>handleChange(e)}>
    <option hidden value="">Select category</option>
    <option value="">get categoriy</option>
  </select><br/> */}

  <label>Description: </label>
  <textarea value={input.description} autoComplete="off" placeholder="Please write a description..." name="description" onChange={(e)=>handleChange(e)}/><br/>
  {errors.description &&<p className="err">{errors.description}</p>}

  <label><input onChange={(e)=>handleCheck(e)}  type="radio" name="check" value="buy" />Buy</label>
  <label><input onChange={(e)=>handleCheck(e)}  type="radio" name="check" value="sell"/>sell</label><br/>
  {errors.sell &&<p className="err">{errors.sell}</p>}

  <button type="submit" className="boton">Create Post</button>
</form>
</div>
  )}








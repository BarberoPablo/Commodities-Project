import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesByName,
  getAllCountries,
  postPost,
  getUserDetails,
} from "../../Redux/Actions/Actions";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import s from "./CreatePost.module.css";

export default function CreatePost() {
  const dispatch = useDispatch();
  const { allCategories } = useSelector((state) => state.categories);
  const { allCountries } = useSelector((state) => state.countries);
  const { user } = useAuth0();

  const [errors, setErrors] = useState({}); //validaciones front
  const [checkBS, setCheckBS] = useState(0);

  useEffect(() => {
    dispatch(getCategoriesByName());
    dispatch(getAllCountries());
    if (user) {
      dispatch(getUserDetails(user.email));
    }
  }, [dispatch, user]);

  const [input, setInput] = useState({
    //acomadar a modelo
    title: "",
    description: "",
    sell: false,
    shipping: [],
    payment: [],
    categoryName: "",
    subCategory: "",
    country: "",
    image: "",
  });

  //console.log(input);
  //handles
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      //userId: user?.email,
    });
  }
  function handleChangeArray(e) {
    setInput({
      ...input,
      [e.target.name]: [e.target.value],
      //userId: user?.email,
    });
  }

  function handleChange2(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        [e.target.name]: [...input.payment, e.target.value],
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: input.payment.filter((p) => p !== e.target.value),
      });
    }
  }

  const [idCategory, setIdCategory] = useState(0);

  function handleChange3(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setIdCategory(e.target.value);
  }

  function handleCheck(e) {
    setCheckBS(1);
    if (e.target.value === "sell") {
      setInput({
        ...input,
        sell: true,
      });
    }
    if (e.target.value === "buy") {
      setInput({
        ...input,
        sell: false,
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      alert("plaese login to create a post");
      return;
    }
    console.log(input);
    let val = validacion(input);
    setErrors(val);
    console.log(val);
    dispatch(postPost(user.email, input));
    if (Object.keys(val).length > 0) {
      alert("Fix errors");
      val = {};
      setInput({
        sell: false,
        shipping: [],
        payment: [],
      });
      return;
    }
    alert("Post Created");
    setInput({
      title: "",
      description: "",
      sell: false,
      shipping: [],
      payment: [],
      categoryName: "",
      subCategory: "",
      country: "",
      image: "",
    });
  }

  //validacion
  function validacion(input) {
    let errors = {};
    if (!input.title) {
      errors.title = "Please complete the tittle of the post";
    }
    if (input.description === "") {
      errors.description = "Complete description";
    }
    if (input.description.length > 255) {
      errors.description =
        "the description can not have more than 255 characters";
    }
    if (input.shipping.length === 0) {
      errors.shipping = "Complete shipping";
    }
    if (input.payment.length === 0) {
      errors.payment = "Complete payment";
    }
    if (input.categoryName === "") {
      errors.categoryName = "Complete Category";
    }
    if (input.subCategory === "") {
      errors.subCategory = "Complete Sub category";
    }
    if (input.country === "") {
      errors.country = "Complete country";
    }
    if (checkBS < 1) {
      errors.sell = "Select sell or buy";
    }

    return errors;
  }

  const [img, setImg] = useState("");

  async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("upload_preset", "kl8ubh2v");
    const imgUrl = await axios
      .post("https://api.cloudinary.com/v1_1/nicomsl/image/upload", formData)
      .then((response) => response.data.secure_url);
    setImg(imgUrl);
    console.log(imgUrl);
  }

  function aceptar() {
    if (img === "") {
      alert("image not selected");
      return;
    }
    setInput({
      ...input,
      image: img,
    });
  }

  return (
    <div className={s.container}>
      {/* <Link to="/">
        <button className="boton" id="btna">
          Go Back
        </button>
      </Link> */}
      <h1>Create new post</h1>
      <form onSubmit={(e) => handleSubmit(e)} className={s.form}>
        <div className={s.tittle}>
          <input
            type="text"
            value={input.title}
            autoComplete="off"
            placeholder="Please write a title..."
            name="title"
            onChange={(e) => handleChange(e)}
          />
        </div>
        {errors.title && <p className="err">{errors.title}</p>}
        <select
          value={input.shipping}
          name="shipping"
          onChange={(e) => handleChangeArray(e)}
        >
          <option hidden value="">
            Shipping method
          </option>
          <option value={["CIF"]}>CIF</option>
          <option value={["FOB"]}>FOB</option>
          <option value={["CIF", "FOB"]}>CIF or FOB</option>
        </select>
        {errors.shipping && <p className="err">{errors.shipping}</p>}
        <label>Payment method:</label>
        <div className={s.payment}>
          <label>
            <input
              type="checkbox"
              value="LC"
              onChange={(e) => handleChange2(e)}
              name="payment"
            />{" "}
            LC
          </label>
          <label>
            <input
              type="checkbox"
              value="DLC"
              onChange={(e) => handleChange2(e)}
              name="payment"
            />{" "}
            DLC
          </label>
          <label>
            <input
              type="checkbox"
              value="SBLC"
              onChange={(e) => handleChange2(e)}
              name="payment"
            />{" "}
            SBLC
          </label>

          {errors.payment && <p className="err">{errors.payment}</p>}
        </div>

        <select
          value={input.categoryName}
          name="categoryName"
          onChange={(e) => handleChange3(e)}
          className={s.category}
        >
          <option hidden value="">
            Select category
          </option>
          {allCategories?.map((e, i) => {
            return (
              <option value={e.name} key={i}>
                {e.name}
              </option>
            );
          })}
        </select>

        {errors.categoryName && <p className="err">{errors.categoryName}</p>}

        {idCategory === 0 ? (
          <div />
        ) : (
          <div>
            <select
              value={input.subCategory}
              name="subCategory"
              onChange={(e) => handleChange(e)}
            >
              <option hidden value="">
                Select sub category
              </option>
              {allCategories?.map((e, i) => {
                return e.name === idCategory
                  ? e.subcategories?.map((e) => (
                      <option value={e} key={i}>
                        {e}
                      </option>
                    ))
                  : null;
              })}
            </select>

            {errors.subCategory && <p className="err">{errors.subCategory}</p>}
          </div>
        )}
        <textarea
          className={s.description}
          value={input.description}
          autoComplete="off"
          placeholder="Please write a description..."
          name="description"
          onChange={(e) => handleChange(e)}
        />

        {errors.description && <p className="err">{errors.description}</p>}
        <div className={s.buy}>
          <label>
            <input
              onChange={(e) => handleCheck(e)}
              type="radio"
              name="check"
              value="buy"
            />
            Buy
          </label>
          <label>
            <input
              onChange={(e) => handleCheck(e)}
              type="radio"
              name="check"
              value="sell"
            />
            sell
          </label>
        </div>
        {errors.sell && <p className="err">{errors.sell}</p>}
        <select
          value={input.country}
          name="country"
          onChange={(e) => handleChange(e)}
        >
          <option hidden value="">
            Select country...
          </option>
          {allCountries.map((c) => (
            <option value={c.name.common}>{c.name.common}</option>
          ))}
        </select>

        {errors.country && <p className="err">{errors.country}</p>}

        <div>
          <input
            type="file"
            onChange={(e) => {
              uploadImage(e.target.files);
            }}
          />

          <img style={{ width: 200 }} src={img} alt="" />

          {img !== "" ? (
            <button
              type="button"
              onClick={() => {
                aceptar();
              }}
              className={s.boton}
              style={{ marginTop: "5px" }}
            >
              confirm image
            </button>
          ) : null}
        </div>

        <button type="submit" className={s.boton}>
          Create Post
        </button>
      </form>
    </div>
  );
}

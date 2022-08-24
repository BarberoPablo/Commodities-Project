import React from "react";
import Logo from "../../../Img/LogoB2B.png";
import Search from "./Search";
import s from "./Navbar.module.css";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = ({setCurrentPage}) => {
  const history = useHistory();
  const { user, loginWithRedirect, logout } = useAuth0();
  const goFor = (e) => {
    history.push("/");
  };

  return (
    <div className={s.container} >
      <img src={Logo} alt='Logo' className={s.container_logo} onClick={e => goFor(e)}/>
      <Search setCurrentPage={setCurrentPage}/>
      <a href='create-post' className={s.container_a} > CREATE POST</a>
      <div>
        {user ? (
          <>
            <span style={{ color: "white" }}>
              Hi, {user.name}{" "}
              <img width={50} height={50} src={user.picture} alt="" />
            </span>
            {console.log(user.picture)}
          </>
        ) : (
          false
        )}
        <button className={s.container_a} onClick={loginWithRedirect}>
          LogIn
        </button>
        <button className={s.container_a} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

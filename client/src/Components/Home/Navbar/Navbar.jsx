import React from "react";
import Logo from "../../../Img/LogoB2B.png";
import Search from "./Search";
import s from "./Navbar.module.css";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

const Navbar = ({ setCurrentPage }) => {
  const userLog = useSelector((state) => state.users.user);
  const history = useHistory();
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const goFor = (e) => {
    history.push("/");
    history.go(0);
  };

  return (
    <div className={s.container}>
      <div className={s.logo} onClick={(e) => goFor(e)}>
        <img src={Logo} alt="Logo" className={s.container_logo} />
        <p>B2B Commodities</p>
      </div>
      <Search setCurrentPage={setCurrentPage} />
      <a href="create-post" className={s.container_a}>
        {" "}
        CREATE POST
      </a>
      <div>
        {user ? (
          <>
            <span style={{ color: "white" }}>
              <a href="http://localhost:3000/profile" className={s.a}>
                {userLog ? userLog.name : user.name}{" "}
                <img
                  width={50}
                  height={50}
                  src={userLog ? userLog.image : user.picture}
                  alt=""
                />
              </a>
            </span>
          </>
        ) : (
          false
        )}
        {isAuthenticated ? null : (
          <button className={s.container_a} onClick={loginWithRedirect}>
            LogIn
          </button>
        )}
        <button className={s.container_a} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

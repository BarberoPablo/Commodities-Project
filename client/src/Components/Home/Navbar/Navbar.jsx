import React from "react";
import Logo from "../../../Img/LogoB2B.png";
import Search from "./Search";
import s from "./Navbar.module.css";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { filterBySubcategory, getCategoriesByName } from "../../../Redux/Actions/Actions";
import {  Container, Nav, Navbar, NavDropdown, Offcanvas,Button } from "react-bootstrap";
import {AiOutlineMenu} from 'react-icons/ai'
import {BiLogOut} from 'react-icons/bi'
import {BsPersonCircle, BsFillChatLeftTextFill} from 'react-icons/bs'



const Navbarr = ({ setCurrentPage }) => {
  const userLog = useSelector((state) => state.users.user);
  const history = useHistory();
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const goFor = (e) => {
    history.push("/");
    history.go(0);
  };

  //BOOTSTRAP
  const {allCategories} = useSelector(state => state.categories)

  const dispatch = useDispatch()
  const handleChange = (e) =>{
    dispatch(filterBySubcategory(e.target.value))
    setCurrentPage(1)
  }

  useEffect(()=>{
    dispatch(getCategoriesByName())
  },[dispatch])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar expand="lg" className={s.container}>
      <Container fluid>

        {/* RESPONSIVE */}
        <div className={s.mobile}>
          <Button variant="primary" onClick={handleShow}>
            <AiOutlineMenu />
          </Button>
          <Offcanvas show={show} onHide={handleClose}>
            <div>
              {allCategories?.map((e, i) => (
                <select
                  key={i}
                  defaultValue={"DEFAULT"}
                  onChange={handleChange}
                >
                  <option value="DEFAULT" disabled>
                    {e.name}
                  </option>
                  {e.subcategories?.map((e, i) => (
                    <option key={i} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          </Offcanvas>
        </div>

        {/* NAVBAR DESKTOP */}
        <div className={s.container_desktop} >
          <Navbar.Brand href="/">
            <img src={Logo} alt="Logo" className={s.container_logo} />
          </Navbar.Brand>
          <Navbar.Brand href="/" style={{textDecoration:'none'}}>
            <h2 >B2B Commodities</h2>
          </Navbar.Brand>
         <Navbar.Brand href="/memberships">
            <button>Buy membership</button>
          </Navbar.Brand>
        </div>
        <Search setCurrentPage={setCurrentPage} />

        {isAuthenticated ? (
          <Nav className={s.container_nav}>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={
                <img
                  src={user?.picture}
                  style={{ width: "50px", height: "50px" }}
                />
              }
              menuVariant="dark"
              align="end"
            >
              <NavDropdown.Item href="profile">
                <div >
                  <BsPersonCircle /> Profile
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="create-post">
                <BsFillChatLeftTextFill /> Create post
              </NavDropdown.Item>
              <NavDropdown.Item className={s.actions}>
                <div>
                  <BiLogOut />
                  <button onClick={logout}>Logout</button>
                </div>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : (
          <button className={s.container_a} onClick={loginWithRedirect}>
            LogIn
          </button>
        )}
       
      </Container>
    </Navbar>
  );
};

export default Navbarr;


{/* <div className={s.logo} onClick={(e) => goFor(e)}>
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
                {userLog.name ? userLog.name : user.nickname}{" "}
                <img
                  width={40}
                  height={40}
                  src= {userLog.image ? userLog.image : user.picture}
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
      </div> */}

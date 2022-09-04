import React from "react";
import Logo from "../../../Img/LogoB2B.png";
import Search from "./Search";
import s from "./Navbar.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { filterBySubcategory, getCategoriesByName,Searching } from "../../../Redux/Actions/Actions";
import {  Container, Nav, Navbar, NavDropdown, Offcanvas,Button } from "react-bootstrap";
import {AiOutlineMenu} from 'react-icons/ai'
import {BiLogOut} from 'react-icons/bi'
import {BsPersonCircle, BsFillChatLeftTextFill} from 'react-icons/bs'

const Navbarr = ({ setCurrentPage }) => {
  const userLog = useSelector((state) => state.users.user);
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  //BOOTSTRAP
  const {allCategories} = useSelector(state => state.categories)

  const dispatch = useDispatch()
  // const handleChange = (e) =>{
  //   dispatch(filterBySubcategory(e.target.value))
  //   setCurrentPage(1)
  // }

  useEffect(()=>{
    dispatch(getCategoriesByName())
  },[dispatch])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //OffCanvas 
  const [active, setActive] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(filterBySubcategory(e.target.innerHTML));
    setCurrentPage(1);
    setActive(!active);
    dispatch(Searching('categories'))
  };

  return (
    <Navbar expand="lg" className={s.container}>
      <Container fluid>
        {/* RESPONSIVE */}
        <div className={s.mobile}>
          <Button variant="primary" onClick={handleShow}>
            <AiOutlineMenu />
          </Button>
          <Offcanvas show={show} onHide={handleClose}>
            <div className={s.mobile_options}>
              {allCategories?.map((e, i) => (
                <div key={i} className={s.container_subcategories}>
                  <label>{e.name}</label>
                  {e.subcategories.map((e, i) => (
                    <button
                    key={i}
                    onClick={handleClick}
                    className={s.container_li}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </Offcanvas>
        </div>

        {/* NAVBAR DESKTOP */}
        <div className={s.container_desktop}>
          <Navbar.Brand href="/">
            <img src={Logo} alt="Logo" className={s.container_logo} />
          </Navbar.Brand>
          <Navbar.Brand href="/" style={{ textDecoration: "none" }}>
            <h2>B2B Commodities</h2>
          </Navbar.Brand>
          <Navbar.Brand href="/memberships">
            <button className={s.boton}>Memberships</button>
          </Navbar.Brand>
        </div>
        <Search setCurrentPage={setCurrentPage} />

        {isAuthenticated ? (
          <Nav className={s.container_nav}>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={
                <img
                  src={userLog.image ? userLog.image : user.picture}
                  alt="User"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50px",
                  }}
                />
              }
              menuVariant="dark"
              align="end"
            >
              <NavDropdown.Item href="/profile">
                <div>
                  <BsPersonCircle /> Profile
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="/create-post">
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

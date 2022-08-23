import React from 'react'
import Logo from '../../../Img/LogoB2B.png'
import Search from './Search'
import s from './Navbar.module.css'
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();

  const goFor = (e) => {
      history.push("/")
  }

  return (
    <div className={s.container} >
      <img src={Logo} alt='Logo' className={s.container_logo} onClick={e => goFor(e)}/>
      <Search/>
      <a href='create-post' className={s.container_a} > CREATE POST</a>
      <div>
        <a href='login'className={s.container_a} > LOGIN </a>
        <a href='register'className={s.container_a} > REGISTER </a>
      </div>
    </div>
  )
}

export default Navbar
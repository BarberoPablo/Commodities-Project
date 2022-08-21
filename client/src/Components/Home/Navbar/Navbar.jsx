import React from 'react'
import Logo from '../../../Img/LogoB2B.png'
import Search from './Search'
import s from './Navbar.module.css'

const Navbar = () => {
  return (
    <div className={s.container} >
      <img src={Logo} alt='Logo' className={s.container_logo}/>
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
import React from 'react'
import Logo from '../../../Img/LogoB2B.png'
import Search from './Search'

const Navbar = () => {
  return (
    <div style={{display:'flex', width:'100%',justifyContent:'center'}} >
      <img src={Logo} alt='Logo' style={{width:'100px', heigth:'100px'}} />
      <Search/>
      <a href='login' > LOGIN </a>
      <a href='register' > REGISTER </a>
    </div>
  )
}

export default Navbar
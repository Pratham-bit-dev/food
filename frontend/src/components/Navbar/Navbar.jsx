import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets';

const Navbar = () => {


    const[mennu,setMenu] = useState("home");

  return (
    <div className="navbar">
  <img src={assets.logo} className="logo" alt="Logo" />
  <ul className="navbar-menu">
    <li onClick={ ()=>setMenu("Home")} className="active">Home</li>
    <li onClick={ ()=>setMenu("Menu")}className="active">Menu</li>
    <li onClick={ ()=>setMenu("Contact us")}className="active">Contact us</li>
  </ul>
  <div className="navbar-right">
    <button>Login</button>
    <button><img src={assets.basket_icon} alt="" /></button>
  </div>
</div>

   
  );
}

export default Navbar

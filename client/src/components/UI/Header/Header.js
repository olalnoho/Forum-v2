import React from 'react'
import { NavLink, Link } from 'react-router-dom'
const Header = () => {
   return (
      <header className="header">
         <div className="logo">
            <i className="fas fa-align-left"></i>
            <Link to="/"> dunderHead </Link>
            <i className="fas fa-align-right"></i>
         </div>
         <nav className="nav">
            <ul className="nav__list">
               <li>
                  <NavLink exact activeClassName="navactive" to="/" className="nav__link">
                     <i className="fas fa-home"></i>
                     Home
                  </NavLink>
               </li>
               <li>
                  <NavLink activeClassName="navactive" to="/login" className="nav__link">
                     <i className="fas fa-sign-in-alt"></i>
                     Login
                  </NavLink>
               </li>
               <li>
                  <NavLink activeClassName="navactive" to="register" className="nav__link">
                     <i className="fas fa-pencil-alt"></i>
                     Register
                  </NavLink>
               </li>
               <li>
                  {/* <a href="#!" className="nav__link">
                     <i className="fab fa-connectdevelop"></i>
                     Threads
                  </a> */}
               </li>
            </ul>
         </nav>
      </header>
   )
}

export default Header

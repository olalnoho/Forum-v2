import React from 'react'
import { NavLink } from 'react-router-dom'
const GuestLinks = () => {
   return (
      <>
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
      </>
   )
}

export default GuestLinks

import React from 'react'
import { NavLink } from 'react-router-dom'

const AuthLinks = ({ logout }) => {
   return (
      <>
         <li>
            <NavLink activeClassName="navactive" to="/login" className="nav__link">
               <i className="fas fa-user-circle"></i>
               Profile
            </NavLink>
         </li>
         <li>
            <button onClick={logout} to="register" className="nav__link">
               <i className="fas fa-sign-out-alt"></i>
               Logout
            </button>
         </li>
      </>
   )
}

export default AuthLinks

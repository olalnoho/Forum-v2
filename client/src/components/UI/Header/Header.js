import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import AuthLink from './AuthLinks'
import GuestLinks from './GuestLinks'
const Header = ({ loading }) => {
   const { isAuth, logout } = useContext(AuthContext)
   return (
      <header className="header">
         {!loading &&
         <>
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
                  {isAuth ? <AuthLink logout={logout} /> : <GuestLinks />}
               </ul>
            </nav>
         </>}
      </header>
   )
}

export default Header

import React from 'react'

const Header = () => {
   return (
      <header className="header">
         <div className="logo">
            <i className="fas fa-align-left"></i>
            <a href="/"> dunderHead </a>
            <i className="fas fa-align-right"></i>
         </div>
         <nav className="nav">
            <ul className="nav__list">
               <li>
                  <a href="/login" className="nav__link">
                     <i className="fas fa-sign-in-alt"></i>
                     Login
                  </a>
               </li>
               <li>
                  <a href="register" className="nav__link">
                     <i className="fas fa-pencil-alt"></i>
                     Register
                  </a>
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

import React from 'react'

const Register = () => {
   return (
      <div className="container">
         <form className="form">
            <div className="formheader">
               <h2>
                  Register
               </h2>
            </div>
            <div className="formbody">
               <div className="formfield">
                  <label>Username</label>
                  <input type="text" />
               </div>
               <div className="formfield">
                  <label>Email</label>
                  <input type="text" />
               </div>
               <div className="formfield">
                  <label>Password</label>
                  <input type="password" />
               </div>
               <div className="formfield">
                  <input className="btn btn--primary" type="submit" value="Submit" />
               </div>
            </div>

         </form>
      </div>
   )
}

export default Register

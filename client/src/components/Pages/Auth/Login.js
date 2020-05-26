import React from 'react'
import useForm from '../../../hooks/useForm'
const Login = () => {
   const { inputHandler, formState } = useForm({ username: '', password: '' })
   return (
      <div className="container">
         <form className="form">
            <div className="formheader">
               <h2> Login </h2>
            </div>
            <div className="formbody">

               <div className="formfield">
                  <label>Username</label>
                  <input onChange={inputHandler} name="username" type="text" />
               </div>
               <div className="formfield">
                  <label>Password</label>
                  <input onChange={inputHandler} name="password" type="password" />
               </div>
               <div className="formfield">
                  <input className="btn btn--primary" type="submit" value="Submit" />
               </div>
            </div>
         </form>
      </div>
   )
}

export default Login

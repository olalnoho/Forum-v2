import React, { useState, useEffect, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'
import loginMutation from '../../../gql-queries/loginUser'
import useForm from '../../../hooks/useForm'
import formatError from '../../../utils/formatErrors'
import { AuthContext } from '../../../contexts/AuthContext'

const Login = () => {
   const { isAuth, login } = useContext(AuthContext)
   const [errors, setErrors] = useState([])
   const [loginUser, { data: mutationData, error: mutationError }] = useMutation(loginMutation)
   const { inputHandler, formState } = useForm({ username: '', password: '' })
   
   useEffect(() => {
      if (mutationError) setErrors(mutationError.networkError.result.errors)
      return () => {
         setErrors('')
      }
   }, [mutationError])

   useEffect(() => {
      if (mutationData && mutationData.loginUser && mutationData.loginUser.token) {
         login(mutationData.loginUser.user, mutationData.loginUser.token)
      }
   }, [mutationData, login])

   const submitHandler = async e => {
      e.preventDefault()
      try {
         await loginUser({ variables: formState })
      } catch (err) {
         console.log(err)
      }
   }

   if(isAuth) return <Redirect to="/" />
   return (
      <div className="container">
         <form className="form" onSubmit={submitHandler}>
            <div className="formheader">
               <h2> Login </h2>
            </div>
            {errors && errors.map((err, i) => <p key={i} className="error"> {formatError(err)} </p>)}
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

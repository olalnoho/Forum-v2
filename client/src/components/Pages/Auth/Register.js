import React, { useEffect, useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'
import registerUserMutation from '../../../gql-queries/registerUser'
import useForm from '../../../hooks/useForm'
import formatError from '../../../utils/formatErrors'
import { AuthContext } from '../../../contexts/AuthContext'

const Register = () => {
   const { isAuth, login } = useContext(AuthContext)
   const [errors, setErrors] = useState([])
   
   const { inputHandler, formState } = useForm({
      username: '',
      password: '',
      email: ''
   })

   const [registerUser, { data: mutationData, error: mutationError }] = useMutation(registerUserMutation)

   useEffect(() => {
      if (mutationError) setErrors(mutationError.networkError.result.errors)
      return () => {
         setErrors('')
      }
   }, [mutationError])

   useEffect(() => {
      if (mutationData && mutationData.registerUser && mutationData.registerUser.token) {
         login(mutationData.registerUser.user, mutationData.registerUser.token)
      }
   }, [mutationData, login])

   const submitHandler = async e => {
      e.preventDefault()
      try {
         await registerUser({ variables: formState })
      } catch (error) {
         console.log(error)
      }
   }

   if (isAuth) return <Redirect to="/" />

   return (
      <div className="container">
         <form className="form" onSubmit={submitHandler}>
            <div className="formheader">
               <h2>
                  Register
               </h2>
            </div>
            {errors && errors.map((err, i) => <p key={i} className="error"> {formatError(err)} </p>)}
            <div className="formbody">
               <div className="formfield">
                  <label>Username</label>
                  <input onChange={inputHandler} name="username" type="text" />
               </div>
               <div className="formfield">
                  <label>Email</label>
                  <input onChange={inputHandler} name="email" type="text" />
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

export default Register

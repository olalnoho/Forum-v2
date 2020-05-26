import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import registerUserMutation from '../../../gql-queries/registerUser'
import useForm from '../../../hooks/useForm'
import formatError from '../../../utils/formatErrors'
const Register = () => {
   const [errors, setErrors] = useState('')
   const { inputHandler, formState } = useForm({
      username: '',
      password: '',
      email: ''
   })

   const [registerUser, { data, error: mutationError }] = useMutation(registerUserMutation)

   useEffect(() => {
      if (mutationError) setErrors(mutationError.networkError.result.errors)
      return () => {
         setErrors('')
      }
   }, [mutationError, data])

   const submitHandler = async e => {
      e.preventDefault()
      try {
         await registerUser({ variables: formState })
      } catch (error) {
         // console.log(error)
      }
   }

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

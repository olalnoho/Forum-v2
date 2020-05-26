import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import createThreadMutation from '../../../gql-queries/createThread'
import useForm from '../../../hooks/useForm'
import getSubcatgoryAndThreads from '../../../gql-queries/getSubcatgoryAndThreads'
import formatErrors from '../../../utils/formatErrors'

const CreateThread = ({
   match: { params: { id } },
   history
}) => {
   const [errors, setErrors] = useState([])
   const [createThread, { error: mutationError }] = useMutation(createThreadMutation)
   const { inputHandler, formState } = useForm({
      title: '',
      content: ''
   })

   useEffect(() => {
      if(mutationError) setErrors(mutationError.networkError.result.errors)
   }, [mutationError])

   const submitHandler = async e => {
      e.preventDefault()
      try {
         await createThread({
            variables: { ...formState, subcategory_id: id },
            refetchQueries: [{ query: getSubcatgoryAndThreads, variables: { id } }]
         })
      } catch (error) {
         console.log(error)
      }
   }
   return (
      <div className="container createthread">
         <div className="sm-container">
            <button onClick={history.goBack} className="btn btn--light">Go Back</button>
            <form className="form" onSubmit={submitHandler}>
               <div className="formheader">
                  <h2>Create a thread</h2>
               </div>
               {errors && errors.map((err, i) => <p key={i} className="error"> {formatErrors(err)} </p>)}
               <div className="formbody">
                  <div className="formfield">
                     <label>Title</label>
                     <input onChange={inputHandler} name="title" type="text" />
                  </div>
                  <div className="formfield">
                     <label>Message </label>
                     <textarea onChange={inputHandler} name="content" rows="15"></textarea>
                  </div>
                  <div className="formfield">
                     <input type="submit" className="btn btn--primary" value="Submit" />
                  </div>
               </div>
            </form>
         </div>
      </div>
   )
}

export default CreateThread

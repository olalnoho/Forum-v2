import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import createThreadMutation from '../../../gql-queries/createThread'
import useForm from '../../../hooks/useForm'
import getThreads from '../../../gql-queries/getAllThreadsInSubcategory'
import Spinner from '../../UI/Spinner/Spinner'
import formatErrors from '../../../utils/formatErrors'

const CreateThread = ({
   match: { params: { id } },
   history
}) => {
   const [errors, setErrors] = useState([])
   const [createThread, { error: mutationError, data: mutationData, loading }] = useMutation(createThreadMutation)
   const { inputHandler, formState } = useForm({
      title: '',
      content: ''
   })

   useEffect(() => {
      if (mutationError) setErrors(mutationError.networkError.result.errors)
   }, [mutationError])

   useEffect(() => {
      if (mutationData && mutationData.createThread.success === true) {
         history.push(`/category/${id}`)
      }
   }, [mutationData, history, id])

   const submitHandler = async e => {
      e.preventDefault()
      createThread({
         variables: { ...formState, subcategory_id: id },
         update: (store, { data: { createThread: thread } }) => {
            const storeData = store.readQuery({ query: getThreads, variables: { id } })
            if (!storeData) return
            Object.assign(thread, {
               created_at: new Date(),
               lastPost: null,
               postCount: 0
            })
            const oldThreads = (storeData.getAllThreadsInSubcategory || [])
            storeData.getAllThreadsInSubcategory = [thread, ...oldThreads]
            store.writeQuery({ query: getThreads, variables: { id }, data: storeData })
         }
      })
   }
   return (
      <div className="container">
         <div className="createthread">
            <button onClick={history.goBack} className="btn btn--light btn--back">
               <i className="fas fa-arrow-left"></i>
               Go Back
            </button>
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
                     <textarea onChange={inputHandler} name="content" rows="8"></textarea>
                  </div>
                  <div className="formfield">
                     {loading ? <Spinner className="formLoader" /> : <input type="submit" className="btn btn--primary" value="Submit" />}
                  </div>
               </div>
            </form>
         </div>
      </div>
   )
}

export default CreateThread

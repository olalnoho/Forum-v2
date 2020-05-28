import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Spinner from '../../UI/Spinner/Spinner'
import useForm from '../../../hooks/useForm'
import getThreadById from '../../../gql-queries/getThreadById'
import createPost from '../../../gql-queries/createPost'
import Post from './Post'
import formatDate from '../../../utils/formatDate'
const Thread = ({
   match: { params: { id } }
}) => {
   const { formState, inputHandler, clearInput } = useForm({
      content: ''
   })
   const { data, error: queryError } = useQuery(getThreadById, { variables: { id } })
   const [createPostMutation, { data: mutationData, error: mutationError, loading }] = useMutation(createPost)
   useEffect(() => {
      mutationError && console.dir(mutationError)
   }, [mutationError])

   const submitHandler = async e => {
      e.preventDefault()
      await createPostMutation({
         variables: { thread_id: id, ...formState }, refetchQueries: [{
            query: getThreadById,
            variables: { id }
         }],
         awaitRefetchQueries: true
      })
      clearInput()
   }

   return (
      <div className="container">
         <div className="threadview">
            <Link className="btn btn--light btn--back" to="/">
            <i className="fas fa-arrow-left"></i>
               Go Back
            </Link>
            {queryError && <h2 className="heading-2"> Could not find Thread. </h2>}
            {data &&
               <>
                  <div className="threadview__header">
                     <h2> {data.getThreadById.title} </h2>
                     <span>By: {data.getThreadById.creator.username} - {formatDate(data.getThreadById.created_at)} </span>
                     <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare lectus sit amet est placerat in egestas. Blandit cursus risus at ultrices mi. Libero enim sed faucibus turpis. Placerat vestibulum lectus mauris ultrices eros in. Aliquet enim tortor at auctor urna. Platea dictumst vestibulum rhoncus est pellentesque. Purus sit amet volutpat consequat mauris nunc congue nisi. Etiam tempor orci eu lobortis elementum nibh tellus molestie. </p>
                  </div>
                  <div className="threadview__actions">
                     <Link className="btn btn--light" to="#!">Start new thread</Link>
                     <a className="btn btn--primary" href="#threadreply">Reply to this thread</a>
                  </div>
                  <div className="threadview__posts">
                     {data.getThreadById.posts.map(x => <Post key={x.id} post={x} />)}
                  </div>
                  <div className="threadview__reply" id="threadreply">
                     <form className="form" onSubmit={submitHandler}>
                        <div className="formheader">
                           <h3>Join the conversation</h3>
                        </div>
                        <div className="formbody">
                           <div className="formfield">
                              <label>Message</label>
                              <textarea value={formState.content} onChange={inputHandler} name="content" rows="6"></textarea>
                           </div>
                           <div className="formfield">
                              {loading ?
                                 <Spinner className="formLoader" /> :
                                 <input className="btn btn--primary" type="submit" value="Submit" />
                              }
                           </div>
                        </div>
                     </form>
                  </div>
               </>
            }
         </div>
      </div>
   )
}

export default Thread

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { useQuery, useMutation } from '@apollo/react-hooks'
import formatDate from '../../../utils/formatDate'

import Paginator from '../../UI/Paginator/Paginator'
import Spinner from '../../UI/Spinner/Spinner'
import useForm from '../../../hooks/useForm'
import Post from './Post'

import createPost from '../../../gql-queries/createPost'
import getThreadById from '../../../gql-queries/getThreadById'
import getLandingData from '../../../gql-queries/getLandingData'
import getSubcategoryById from '../../../gql-queries/getSubcatgoryAndThreads'
import getPosts from '../../../gql-queries/getPostsByThreadId'
import getTotalPosts from '../../../gql-queries/getTotalPostsInThread'

const POSTS_PER_PAGE = 6

const Thread = ({
   match: { params: { id } },
   location
}) => {
   const page = (queryString.parse(location.search).page || 1)
   const { formState, inputHandler, clearInput } = useForm({ content: '' })
   const { data, error: queryError } = useQuery(getThreadById, { variables: { id } })
   const { data: totalPosts, error: totalPostsError, loading: totalPostsLoading } = useQuery(getTotalPosts, { variables: { id } })
   const { data: posts, loading: loadingPosts, error: postsError } = useQuery(getPosts, {
      variables: {
         id,
         limit: POSTS_PER_PAGE,
         offset: POSTS_PER_PAGE * (page - 1)
      },
   })

   const [createPostMutation, { error: mutationError, loading }] = useMutation(createPost)

   useEffect(() => {
      mutationError && console.dir(mutationError)
      totalPostsError && console.dir(totalPostsError)
      postsError && console.dir(postsError)
   }, [mutationError, totalPostsError, postsError])

   useEffect(() => {
      window.scrollTo(0, 50)
   }, [page])

   const submitHandler = async e => {
      e.preventDefault()
      // @note
      // refetching getLandingData and getSubcategoryById
      // is only for post count - make better dawg.
      if (!formState.content.trim()) return
      await createPostMutation({
         variables: { thread_id: id, ...formState }, refetchQueries: [{
            query: getThreadById,
            variables: { id }
         }, {
            query: getLandingData
         }, {
            query: getSubcategoryById,
            variables: { id: data.getThreadById.subcategory_id }
         }],
         awaitRefetchQueries: true,
      })
      clearInput()
   }

   return (
      <div className="container">
         <div className="threadview">
            {data && <Link className="btn btn--light btn--back" to={`/category/${data.getThreadById.subcategory_id}`}>
               <i className="fas fa-arrow-left"></i>
               Go Back
            </Link>}
            {queryError && <h2 className="heading-2"> Could not find Thread. </h2>}
            {data &&
               <>
                  <div className="threadview__header">
                     <h2> {data.getThreadById.title} </h2>
                     <span>By: {data.getThreadById.creator.username} - {formatDate(data.getThreadById.created_at)} </span>
                     <p> {data.getThreadById.content} </p>
                  </div>
                  <div className="threadview__actions">
                     <Link className="btn btn--light" to={`/category/${data.getThreadById.subcategory_id}/create`}>Start new thread</Link>
                     <a className="btn btn--primary" href="#threadreply">Reply to this thread</a>
                  </div>
                  {!totalPostsLoading && <Paginator page={page} perPage={POSTS_PER_PAGE} total={totalPosts.getTotalPostsInThread}>
                     <div className="threadview__posts">
                        {!loadingPosts ? posts.getPostsByThreadId.map(x => <Post key={x.id} post={x} />) : <Spinner />}
                     </div>
                  </Paginator>}
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

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
import getPosts from '../../../gql-queries/getPostsByThreadId'
import getTotalPosts from '../../../gql-queries/getTotalPostsInThread'
import getAllThreadsInSubcategory from '../../../gql-queries/getAllThreadsInSubcategory'

const POSTS_PER_PAGE = 10

const Thread = ({
   match: { params: { id } },
   location
}) => {
   const page = (queryString.parse(location.search).page || 1)
   const { formState, inputHandler, clearInput } = useForm({ content: '' })
   const { data: threadData, error: threadError } = useQuery(getThreadById, { variables: { id } })
   const { data: totalPosts, error: totalPostsError, loading: totalPostsLoading } = useQuery(getTotalPosts, { variables: { id } })
   const { data: postData, loading: loadingPosts, error: postsError } = useQuery(getPosts, {
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
      if (window.scrollY > 500) window.scrollTo(0, 200)
   }, [page])

   const submitHandler = async e => {
      e.preventDefault()
      // @note
      // refetching getLandingData and getSubcategoryById
      // is only for post count - make better dawg.
      if (!formState.content.trim()) return
      await createPostMutation({
         variables: { thread_id: id, ...formState },
         refetchQueries: [
            {
               query: getLandingData
            },
            {
               query: getPosts, variables: { id, limit: POSTS_PER_PAGE, offset: POSTS_PER_PAGE * (page - 1) }
            },
            {
               query: getAllThreadsInSubcategory, variables: {
                  id: threadData.getThreadById.subcategory_id,
                  limit: 10,
                  offset: 0
               }
            }
         ],
         awaitRefetchQueries: true,
         update: (cache, { data: { createPost: post } }) => {

            // @note
            // updating total posts for getting the correct number of pages.
            const totalPosts = cache.readQuery({
               query: getTotalPosts,
               variables: { id }
            })

            if (totalPosts) {
               totalPosts.getTotalPostsInThread++
               cache.writeQuery({ query: getTotalPosts, variables: { id }, data: totalPosts })
            }
         }
      })
      clearInput()
   }

   return (
      <div className="container">
         <div className="threadview">
            {threadData && <Link className="btn btn--light btn--back" to={`/category/${threadData.getThreadById.subcategory_id}`}>
               <i className="fas fa-arrow-left"></i>
               Go Back
            </Link>}
            {threadError && <h2 className="heading-2"> Could not find Thread. </h2>}
            {threadData &&
               <>
                  <div className="threadview__header">
                     <h2> {threadData.getThreadById.title} </h2>
                     <span>By: {threadData.getThreadById.creator.username} - {formatDate(threadData.getThreadById.created_at)} </span>
                     <p> {threadData.getThreadById.content} </p>
                  </div>
                  <div className="threadview__actions">
                     <Link className="btn btn--light" to={`/category/${threadData.getThreadById.subcategory_id}/create`}>Start new thread</Link>
                     <a className="btn btn--primary" href="#threadreply">Reply to this thread</a>
                  </div>
                  {!totalPostsLoading && <Paginator page={page} perPage={POSTS_PER_PAGE} total={totalPosts.getTotalPostsInThread}>
                     <div className="threadview__posts">
                        {(!loadingPosts || postData) ? postData.getPostsByThreadId.map(x => <Post key={x.id} post={x} />) : <Spinner />}
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

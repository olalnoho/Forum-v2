import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import getThreadById from '../../../gql-queries/getThreadById'
import Post from './Post'
const Thread = ({
   match: { params: { id } }
}) => {
   const { data } = useQuery(getThreadById, { variables: { id } })
   return (
      <div className="container">
         <div className="threadview">
            <Link className="btn btn--light" to="/">Go Back</Link>
            {data &&
               <>
                  <div className="threadview__header">
                     <h2> {data.getThreadById.title} </h2>
                     <span>By:  {data.getThreadById.creator.username}, at {new Date().toLocaleDateString()} </span>
                  </div>
                  <div className="threadview__actions">
                     <Link className="btn btn--light" to="#!">Start new thread</Link>
                     <Link className="btn btn--primary" to="#!">Reply to this thread</Link>
                  </div>
                  <div className="threadview__posts">
                     {data.getThreadById.posts.map(x => <Post key={x.id} post={x}/>)}
                  </div>
               </>
            }

         </div>
      </div>
   )
}

export default Thread

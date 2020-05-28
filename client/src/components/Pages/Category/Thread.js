import React from 'react'
import { Link } from 'react-router-dom'
import formatDate from '../../../utils/formatDate'
const Thread = ({ thread }) => {
   return (
      <li className="thread">
         <div className="thread__info">
            <Link to={`/thread/${thread.id}`}> {thread.title} </Link>
            <p className="info-text"> Made by: {thread.creator.username} </p>
         </div>
         <div className="thread__posts">
            <span> {thread.postCount} {thread.postCount === 1 ? 'reply' : 'replies'}</span>
            {/* <p className="info-text">{x.views} views</p> */}
         </div>
         <div className="thread__user">
            <span> Last post by {thread.lastPost ? thread.lastPost.user.username : thread.creator.username} </span>
            <p className="info-text"> {
               formatDate(thread.lastPost ? thread.lastPost.created_at : thread.created_at)
            }</p>
         </div>
      </li>
   )
}

export default Thread

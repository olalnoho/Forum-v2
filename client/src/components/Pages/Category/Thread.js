import React from 'react'
import { Link } from 'react-router-dom'
const Thread = ({ thread }) => {
   return (
      <li className="thread">
         <div className="thread__info">
            <Link to={`/thread/${thread.id}`}> {thread.title} </Link>
            <p className="info-text"> Made by: {thread.creator.username} </p>
         </div>
         <div className="thread__posts">
            <span>20 replies</span>
            {/* <p className="info-text">{x.views} views</p> */}
         </div>
         <div className="thread__user">
            <span> Last post </span>
            <p className="info-text"> {new Date().toLocaleDateString('en-us')}</p>
         </div>
      </li>
   )
}

export default Thread

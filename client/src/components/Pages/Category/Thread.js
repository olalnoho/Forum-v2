import React from 'react'

const Thread = ({ x }) => {
   return (
      <li className="thread">
         <div className="thread__info">
            <a href="#!"> {x.title} </a>
            <p className="info-text"> Made by: {x.author} </p>
         </div>
         <div className="thread__posts">
            <span>{x.replies} replies</span>
            <p className="info-text">{x.views} views</p>
         </div>
         <div className="thread__user">
            <span> {x.last_post.author}</span>
            <p className="info-text"> {x.last_post.date.toLocaleDateString('en-us')}</p>
         </div>
      </li>
   )
}

export default Thread

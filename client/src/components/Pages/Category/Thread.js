import React from 'react'

const Thread = ({ x }) => {
   return (
      <li className="thread">
         <div className="thread__info">
            <a href="#!"> {x.title} </a>
            <p className="info-text"> Made by: {x.creator.username} </p>
         </div>
         <div className="thread__posts">
            <span>20 replies</span>
            {/* <p className="info-text">{x.views} views</p> */}
         </div>
         <div className="thread__user">
            <span> last post </span>
            <p className="info-text"> {new Date().toLocaleDateString('en-us')}</p>
         </div>
      </li>
   )
}

export default Thread

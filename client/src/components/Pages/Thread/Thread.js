import React from 'react'
import { Link } from 'react-router-dom'
const Thread = props => {
   console.log(props)
   return (
      <div className="container">
         <div className="threadview">
            <Link className="btn btn--light" to="/">Go back</Link>
            <div className="threadview__header">
               <h2 className="heading-2">
                  This is my thread
               </h2>
            </div>
            <div className="threadview__actions">
               <Link className="btn btn--light" to="#!">Start new thread</Link>
               <Link className="btn btn--primary" to="#!">Reply to this thread</Link>
            </div>
            <div className="threadview__posts"></div>

            </div>
         </div>
   )
}

export default Thread

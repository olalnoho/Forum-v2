import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import getThreadById from '../../../gql-queries/getThreadById'
import Post from './Post'
const Thread = ({
   match: { params: { id } }
}) => {
   const { data } = useQuery(getThreadById, { variables: { id } })
   const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
   return (
      <div className="container">
         <div className="threadview">
            <Link className="btn btn--light" to="/">Go Back</Link>
            {data &&
               <>
                  <div className="threadview__header">
                     <h2> {data.getThreadById.title} </h2>
                     <span>By: {data.getThreadById.creator.username}, at {new Date().toLocaleDateString()} </span>
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
                     <form className="form">
                        <div className="formheader">
                           <h3>Join the conversation</h3>
                        </div>
                        <div className="formbody">

                           <div className="formfield">
                              <label>Message</label>
                              <textarea rows="6"></textarea>
                           </div>
                           <div className="formfield">
                              <input className="btn btn--primary" type="submit" value="Submit" />
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

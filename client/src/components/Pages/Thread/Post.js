import React from 'react'
import parseText from '../../../utils/parseToHtml'
const Post = ({ post }) => {
   return (
      <div className="post">
         <div className="post__user">
            <span> {post.user.username} </span>
            <img src="/images/avatar-1292817_960_720.png" alt="avatar" />
            <span>1121 Posts</span>
         </div>
         <div className="post__content">
            <p dangerouslySetInnerHTML={{__html: parseText(post.content)}}></p>
         </div>
      </div>
   )
}

export default Post

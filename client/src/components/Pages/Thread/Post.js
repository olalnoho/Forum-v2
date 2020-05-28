import React from 'react'

const Post = ({ post }) => {
   console.log(post)
   return (
      <div className="post">
         <div className="post__user">
            <span> {post.user.username} </span>
            <img src="https://www.webdesignerforum.co.uk/uploads/set_resources_3/84c1e40ea0e759e3f1505eb1788ddf3c_default_photo.png" alt="avatar" />
            <span>1121 Posts</span>
         </div>
         <div className="post__content">
            <p> {post.content} </p>
         </div>
      </div>
   )
}

export default Post

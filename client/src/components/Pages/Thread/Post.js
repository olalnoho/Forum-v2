import React from 'react'

const Post = ({ post }) => {
   return (
      <div className="post">
         <div className="post__user">
            <span>Jasmine</span>
            <img src="https://www.webdesignerforum.co.uk/uploads/set_resources_3/84c1e40ea0e759e3f1505eb1788ddf3c_default_photo.png" />
            <span>1121 Posts</span>
         </div>
         <div className="post__content"></div>
      </div>
   )
}

export default Post

exports.resolver = {
   async createPost({ content, thread_id }, ctx) {
      
   }
}

class Post {
   constructor({ id, content }) {
      Object.assign(this, { id, content })
   }
}

exports.Post = Post
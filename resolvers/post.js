exports.resolver = {}

class Post {
   constructor({ id, content }) {
      Object.assign(this, { id, content })
   }
}

exports.Post = Post
exports.resolver = {
   async createPost({ content, thread_id }, ctx) {

   }
}

class Post {
   constructor(post, ctx) {
      Object.assign(this, { ...post, ctx })
   }

   async user() {
      try {
         const [u] = await this.ctx.userLoader.load(this.user_id)
         return u
      } catch (err) {
         console.log('Error getting user from post')
         throw new Error(err)
      }
   }
}

exports.Post = Post
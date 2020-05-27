exports.resolver = {
   async createPost({ content, thread_id }, ctx) {

   }
}

class Post {
   constructor({ id, content, user_id }, ctx) {
      Object.assign(this, { id, content, user_id, ctx })
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
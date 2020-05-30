const getUserId = require('../utils/getIdFromToken')

exports.resolver = {
   async getPostsByThreadId({ id, limit, offset }, ctx) {
      try {
         const posts = await ctx.db('post')  
            .where({ thread_id: Number(id) })
            .limit(limit)
            .offset(offset)
         return posts.map(p => new Post(p, ctx))
      } catch (err) {
         console.log('Error getting posts in thread')
         throw new Error(err)
      }
   },

   async getTotalPostsInThread({id}, ctx) {
      try {
         const [n] = await ctx.db('post').count('*').where({ thread_id: Number(id) })
         return n['count(*)']
      } catch (err) {
         console.log('Error getting total number of posts in thread')
         throw new Error(err)
      }
   },

   async createPost({ content, thread_id }, ctx) {
      const user_id = getUserId(ctx.req.headers, true)
      if (!content.trim() || !thread_id.trim()) throw new Error('Invalid data')

      try {
         await ctx.db('post').insert({
            content,
            user_id: Number(user_id),
            thread_id: Number(thread_id),
         })
         return true
      } catch (err) {
         console.log('Error inserting post')
         throw new Error(err)
      }
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
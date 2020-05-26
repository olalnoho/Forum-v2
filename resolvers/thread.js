const { User } = require('./user')
const getUserId = require('../utils/getIdFromToken')

exports.resolver = {
   async getAllThreadsInSubcategory({ id }, ctx) {
      try {
         const threads = await ctx.db('thread').where({ subcategory_id: id })
         return threads.map(t => new Thread(t, ctx))
      } catch (err) {
         console.log('Error getting threads in subcategory')
         throw new Error(err)
      }
   },

   async getWholeThread({ id }, ctx) {
      try {
         const [thread] = await ctx.db('thread').where({ id })
         if (!thread) throw new Error('There is no thread with that id')
         return new Thread(thread, ctx)
      } catch (err) {
         console.log('Error getting whole thread')
         throw new Error(err)
      }
   },

   async createThread({ title, content, subcategory_id }, ctx) {
      [title, content, subcategory_id].forEach(x => {
         if(!x.trim()) throw new Error('Invalid data')
      })
      try {
         const userId = getUserId(ctx.req.headers)
         const res = await ctx.db('thread').insert({
            started_by: userId,
            subcategory_id,
            title,
            content
         })
         const [{ threadId }] = await ctx.db.raw('SELECT last_insert_rowid() as threadId FROM thread');
         return new Thread({ id: threadId, content, title })
      } catch (err) {
         console.log(err)
      }
   }
}

class Thread {
   constructor({ id, title, content, started_by }, ctx) {
      Object.assign(this, {
         id, title, content, started_by, ...ctx
      })
   }

   async creator() {
      const [u] = await this.userLoader.load(this.started_by)
      return new User(u)
   }

   async posts() {
      try {
         const posts = await this.db('post').where({ thread_id: this.id })
         return posts
      } catch (err) {
         console.log('Could not fetch posts from thread' + this.id)
      }
   }
}

exports.Thread = Thread
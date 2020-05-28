const { User } = require('./user')
const { Post } = require('./post')
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

   async getThreadById({ id }, ctx) {
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
         if (!x.trim()) throw new Error('Invalid data')
      })
      try {
         const userId = getUserId(ctx.req.headers)
         await ctx.db('thread').insert({
            started_by: Number(userId),
            subcategory_id: Number(subcategory_id),
            title,
            content
         })
         const [{ threadId }] = await ctx.db.raw('SELECT last_insert_rowid() as threadId FROM thread');
         const t = new Thread({ id: threadId, content, title, started_by: userId }, ctx)
         t.success = true
         return t
      } catch (err) {
         console.log(err)
         throw new Error(err)
      }
   }
}

class Thread {
   constructor(entity, ctx) {
      Object.assign(this, {
         ...entity, ctx
      })
   }

   async creator() {
      const [u] = await this.ctx.userLoader.load(this.started_by)
      return new User(u)
   }

   async posts() {
      try {
         const posts = await this.ctx.postLoader.load(this.id)
         return (posts || []).map(x => new Post(x, this.ctx))
      } catch (err) {
         console.log('Could not fetch posts from thread ' + this.id)
         throw new Error(err)
      }
   }

   async postCount() {
      const res = await this.ctx.threadPostCountLoader.load(this.id)
      return res || 0
   }

   async lastPost() {
      const [lastPost] = await this.ctx.db('post')
         .where('thread_id', this.id)
         .orderBy('created_at', 'desc')
         .limit(1)
      return lastPost ? new Post(lastPost, this.ctx) : null
   }
}

exports.Thread = Thread
const { User } = require('./user')

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
   }
}

class Thread {
   constructor({ id, title, content, started_by }, { db, userLoader }) {
      Object.assign(this, {
         id, title, content, db, started_by, userLoader
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
const { Thread } = require('./thread')

exports.resolver = {
   async getSubcategoryById({ id }, ctx) {
      try {
         const [sc] = await ctx.db('subcategory')
            .select('*')
            .where({ id })
         if (!sc) throw new Error('No subcategory by that id')
         return new Subcategory(sc, ctx)

      } catch (err) {
         console.log('Error retrieving subcategory')
         throw new Error(err)
      }
   }
}

class Subcategory {
   constructor({ id, title, description, category_id }, ctx) {
      Object.assign(this, {
         id, title, description, category_id, ...ctx
      })
   }

   async threads() {
      const thread = await this.threadLoader.load(this.id)
      return thread ? thread.map(x => new Thread(x, { db: this.db, userLoader: this.userLoader })) : null
   }

   async postCount() {
      return await this.postCountLoader.load(this.id)
   }
}

exports.Subcategory = Subcategory
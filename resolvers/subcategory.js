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
   constructor({ id, title, description }, { db, threadLoader }) {
      Object.assign(this, {
         id, title, description, db, threadLoader
      })
   }

   async threads() {
      const thread = await this.threadLoader.load(this.id)
      return thread ? thread.map(x => new Thread(x, this.db)) : null
   }
}

exports.Subcategory = Subcategory
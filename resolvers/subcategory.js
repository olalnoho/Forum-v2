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
         id, title, description, category_id, ctx
      })
   }

   async threads() {
      const thread = await this.ctx.threadLoader.load(this.id)
      return thread ? thread.sort(
         (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      ).map(x => new Thread(x, this.ctx)) : null
   }

   async postCount() {
      return await this.ctx.subcatPostCountLoader.load(this.id)
   }
}

exports.Subcategory = Subcategory
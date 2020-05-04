const { Subcategory } = require('./subcategory')
exports.resolver = {
   async getAllCategories(_, ctx) {
      try {
         const categories = await ctx.db('category').select('*')
         return categories.map(x => new Category(x, ctx))
      } catch (err) {
         console.log('Error retrieving categories')
         throw new Error(err)
      }
   }
}

class Category {
   constructor({ title, id }, { db, subcatLoader, threadLoader }) {
      Object.assign(this, {
         title, id, db, subcatLoader, threadLoader
      })
   }
   async subcategories() {
      return ((await this.subcatLoader.load(this.id)) || [])
         .map(x => new Subcategory(x, { db: this.db, threadLoader: this.threadLoader }))
   }
}

exports.Category = Category
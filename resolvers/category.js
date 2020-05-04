module.exports = {
   async getAllCategories(_, { db }) {
      try {
         const categories = await db('category').select('*')
         return categories.map(x => new Category(x, db))
      } catch (err) {
         console.log('Error retrieving categories')
         throw new Error(err)
      }
   }
}

class Category {
   constructor(init, db) {
      this.title = init.title
      this.id = init.id
      this.db = db
   }

   async subcategories() {
      try {
         return this.db('subcategory').select('*').where({
            category_id: this.id
         })
      } catch (err) {
         console.log('Error retrieving sub-categories')
         throw new Error(err)
      }
   }
}
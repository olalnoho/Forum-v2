module.exports = {
   async getSubcategoryById({ id }, { db }) {
      const [sc] = await db('subcategory')
         .select('*')
         .where({ id })
      if (!sc) throw new Error('No subcategory by that id')
      return new Subcategory(sc, db)
   }
}

class Subcategory {
   constructor({ id, title, description }, db) {
      Object.assign(this, {
         id,
         title,
         description,
         db
      })
   }

   async threads() {
      return this.db('thread').select('*').where({
         subcategory_id: this.id
      })
   }
}
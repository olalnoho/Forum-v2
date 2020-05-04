const { Thread } = require('./thread')

exports.resolver = {
   async getSubcategoryById({ id }, { db }) {
      try {
         const [sc] = await db('subcategory')
            .select('*')
            .where({ id })
         if (!sc) throw new Error('No subcategory by that id')
         return new Subcategory(sc, db)

      } catch (err) {
         console.log('Error retrieving subcategory')
         throw new Error(err)
      }
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
      const thread = await this.db('thread').select('*').where({
         subcategory_id: this.id
      })
      return thread.map(x => new Thread(x, this.db))
   }
}

exports.Subcategory = Subcategory
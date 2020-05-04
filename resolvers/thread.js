const { User } = require('./user')

exports.resolver = {

}

exports.Thread = class Thread {
   constructor({ id, title, content, started_by }, db) {
      Object.assign(this, {
         id, title, content, db, started_by
      })
   }

   async creator() {
      const [u] = await this.db('user').select('id', 'username')
         .where({
            id: this.started_by
         })
      return new User(u)
   }
}